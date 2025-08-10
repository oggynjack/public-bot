import type { Player, Track } from "lavalink-client";
import type { Requester } from "@/typings/player";

export const requesterTransformer = (requester: any): Requester => {
    if (
        typeof requester === "object" &&
        "avatar" in requester &&
        Object.keys(requester).length === 3
    )
        return requester as Requester;
    if (typeof requester === "object" && "displayAvatarURL" in requester) {
        return {
            id: requester.id,
            username: requester.username,
            avatarURL: requester.displayAvatarURL({ extension: "png" }),
            discriminator: requester.discriminator,
        };
    }
    return { id: requester!.toString(), username: "unknown" };
};

export async function autoPlayFunction(player: Player, lastTrack?: Track): Promise<void> {
    if (!player.get("autoplay")) return;
    if (!lastTrack) return;

    // Enhanced autoplay: Support SoundCloud, YouTube, and Spotify
    if (lastTrack.info.sourceName === "soundcloud") {
        // For SoundCloud, search for related tracks by artist
        const artistName = lastTrack.info.author || "unknown";
        const res = await player
            .search(
                {
                    query: `scsearch:${artistName}`,
                    source: "soundcloud",
                },
                lastTrack.requester,
            )
            .then((response: any) => {
                // Filter out the current track and shuffle results
                const filteredTracks = response.tracks
                    .filter((v: { info: { identifier: string } }) =>
                        v.info.identifier !== lastTrack.info.identifier
                    )
                    .sort(() => Math.random() - 0.5); // Shuffle for variety
                response.tracks = filteredTracks;
                return response;
            })
            .catch(console.warn);
        
        if (res && res.tracks.length > 0) {
            await player.queue.add(
                res.tracks
                    .slice(0, 5)
                    .map((track: { pluginInfo: { clientData: any } }) => {
                        track.pluginInfo.clientData = {
                            ...(track.pluginInfo.clientData || {}),
                            fromAutoplay: true,
                        };
                        return track;
                    }),
            );
        }
        return;
    }

    if (lastTrack.info.sourceName === "spotify") {
        const filtered = player.queue.previous
            .filter((v) => v.info.sourceName === "spotify")
            .slice(0, 5);
        const ids = filtered.map(
            (v) =>
                v.info.identifier ||
                v.info.uri.split("/")?.reverse()?.[0] ||
                v.info.uri.split("/")?.reverse()?.[1],
        );
        if (ids.length >= 2) {
            const res = await player
                .search(
                    {
                        query: `seed_tracks=${ids.join(",")}`,
                        source: "sprec",
                    },
                    lastTrack.requester,
                )
                .then((response: any) => {
                    response.tracks = response.tracks.filter(
                        (v: { info: { identifier: string } }) =>
                            v.info.identifier !== lastTrack.info.identifier,
                    );
                    return response;
                })
                .catch(console.warn);
            if (res && res.tracks.length > 0)
                await player.queue.add(
                    res.tracks
                        .slice(0, 5)
                        .map((track: { pluginInfo: { clientData: any } }) => {
                            track.pluginInfo.clientData = {
                                ...(track.pluginInfo.clientData || {}),
                                fromAutoplay: true,
                            };
                            return track;
                        }),
                );
        }
        return;
    }

    if (
        lastTrack.info.sourceName === "youtube" ||
        lastTrack.info.sourceName === "youtubemusic"
    ) {
        // Try YouTube Mix first, fallback to SoundCloud search if it fails
        let res = await player
            .search(
                {
                    query: `https://www.youtube.com/watch?v=${lastTrack.info.identifier}&list=RD${lastTrack.info.identifier}`,
                    source: "youtube",
                },
                lastTrack.requester,
            )
            .then((response: any) => {
                response.tracks = response.tracks.filter(
                    (v: { info: { identifier: string } }) =>
                        v.info.identifier !== lastTrack.info.identifier,
                );
                return response;
            })
            .catch(console.warn);

        // If YouTube fails or returns no results, fallback to SoundCloud search
        if (!res || res.tracks.length === 0) {
            const artistName = lastTrack.info.author || "unknown";
            res = await player
                .search(
                    {
                        query: `scsearch:${artistName}`,
                        source: "soundcloud",
                    },
                    lastTrack.requester,
                )
                .then((response: any) => {
                    const filteredTracks = response.tracks
                        .filter((v: { info: { identifier: string } }) =>
                            v.info.identifier !== lastTrack.info.identifier
                        )
                        .sort(() => Math.random() - 0.5); // Shuffle for variety
                    response.tracks = filteredTracks;
                    return response;
                })
                .catch(console.warn);
        }

        if (res && res.tracks.length > 0) {
            await player.queue.add(
                res.tracks
                    .slice(0, 5)
                    .map((track: { pluginInfo: { clientData: any } }) => {
                        track.pluginInfo.clientData = {
                            ...(track.pluginInfo.clientData || {}),
                            fromAutoplay: true,
                        };
                        return track;
                    }),
            );
        }
        return;
    }

    // Fallback for any other source: try SoundCloud search by artist
    const artistName = lastTrack.info.author || "unknown";
    const res = await player
        .search(
            {
                query: `scsearch:${artistName}`,
                source: "soundcloud",
            },
            lastTrack.requester,
        )
        .then((response: any) => {
            const filteredTracks = response.tracks
                .filter((v: { info: { identifier: string } }) =>
                    v.info.identifier !== lastTrack.info.identifier
                )
                .sort(() => Math.random() - 0.5);
            response.tracks = filteredTracks;
            return response;
        })
        .catch(console.warn);
    
    if (res && res.tracks.length > 0) {
        await player.queue.add(
            res.tracks
                .slice(0, 3) // Fewer tracks for fallback
                .map((track: { pluginInfo: { clientData: any } }) => {
                    track.pluginInfo.clientData = {
                        ...(track.pluginInfo.clientData || {}),
                        fromAutoplay: true,
                    };
                    return track;
                }),
        );
    }
    return;
}
