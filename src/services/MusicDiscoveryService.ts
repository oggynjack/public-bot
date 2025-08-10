import type { Track } from "lavalink-client";

export interface SongAnalysis {
  energy: number; // 0-1 scale
  mood: 'happy' | 'sad' | 'energetic' | 'relaxed' | 'romantic' | 'aggressive' | 'melancholic' | 'uplifting';
  genre: string[];
  tempo: 'slow' | 'medium' | 'fast';
  danceability: number; // 0-1 scale
  acousticness: number; // 0-1 scale
  instrumentalness: number; // 0-1 scale
  popularity: number; // 0-100 scale
}

export interface DiscoveryRecommendation {
  query: string;
  reason: string;
  confidence: number;
  expectedMood: string;
  tags: string[];
}

export class MusicDiscoveryService {
  
  /**
   * Analyze a track to determine its musical characteristics
   */
  analyzeSong(track: Track): SongAnalysis {
    const title = track.info.title.toLowerCase();
    const artist = track.info.author.toLowerCase();
    const uri = track.info.uri;
    
    // Basic analysis based on track information
    const analysis: SongAnalysis = {
      energy: this.estimateEnergy(title, artist),
      mood: this.detectMood(title, artist),
      genre: this.detectGenre(title, artist),
      tempo: this.estimateTempo(title, artist),
      danceability: this.estimateDanceability(title, artist),
      acousticness: this.estimateAcousticness(title, artist),
      instrumentalness: this.estimateInstrumentalness(title, artist),
      popularity: this.estimatePopularity(track)
    };

    return analysis;
  }

  /**
   * Get song recommendations based on current track analysis
   */
  getRecommendations(currentAnalysis: SongAnalysis, currentTrack: Track): DiscoveryRecommendation[] {
    const recommendations: DiscoveryRecommendation[] = [];
    
    // Mood-based recommendations
    recommendations.push(...this.getMoodBasedRecommendations(currentAnalysis));
    
    // Genre-based recommendations
    recommendations.push(...this.getGenreBasedRecommendations(currentAnalysis));
    
    // Energy-level recommendations
    recommendations.push(...this.getEnergyBasedRecommendations(currentAnalysis));
    
    // Artist-based recommendations
    recommendations.push(...this.getArtistBasedRecommendations(currentTrack));
    
    // Sort by confidence and return top 10
    return recommendations
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 10);
  }

  /**
   * Get recommendations for a specific mood
   */
  getMoodPlaylist(mood: string): DiscoveryRecommendation[] {
    const moodPlaylists = {
      happy: [
        { query: "upbeat pop songs", reason: "Energetic and positive vibes", confidence: 0.9, expectedMood: "happy", tags: ["upbeat", "pop", "positive"] },
        { query: "feel good music", reason: "Songs that lift your spirits", confidence: 0.85, expectedMood: "happy", tags: ["feel-good", "uplifting"] },
        { query: "party hits 2024", reason: "Latest party anthems", confidence: 0.8, expectedMood: "happy", tags: ["party", "dance", "current"] }
      ],
      sad: [
        { query: "emotional ballads", reason: "Deep, emotional songs", confidence: 0.9, expectedMood: "sad", tags: ["ballad", "emotional", "slow"] },
        { query: "heartbreak songs", reason: "Songs about loss and heartbreak", confidence: 0.85, expectedMood: "sad", tags: ["heartbreak", "melancholic"] },
        { query: "sad acoustic songs", reason: "Stripped down, emotional tracks", confidence: 0.8, expectedMood: "sad", tags: ["acoustic", "sad", "intimate"] }
      ],
      energetic: [
        { query: "workout music", reason: "High-energy tracks for motivation", confidence: 0.9, expectedMood: "energetic", tags: ["workout", "high-energy", "motivation"] },
        { query: "rock anthems", reason: "Powerful rock songs", confidence: 0.85, expectedMood: "energetic", tags: ["rock", "anthem", "powerful"] },
        { query: "electronic dance music", reason: "Pulsing electronic beats", confidence: 0.8, expectedMood: "energetic", tags: ["electronic", "dance", "beats"] }
      ],
      relaxed: [
        { query: "chill music", reason: "Laid-back, relaxing vibes", confidence: 0.9, expectedMood: "relaxed", tags: ["chill", "relaxing", "mellow"] },
        { query: "lo-fi hip hop", reason: "Smooth, atmospheric beats", confidence: 0.85, expectedMood: "relaxed", tags: ["lo-fi", "hip-hop", "atmospheric"] },
        { query: "ambient music", reason: "Atmospheric, calming sounds", confidence: 0.8, expectedMood: "relaxed", tags: ["ambient", "calming", "atmospheric"] }
      ],
      romantic: [
        { query: "love songs", reason: "Romantic and intimate tracks", confidence: 0.9, expectedMood: "romantic", tags: ["love", "romantic", "intimate"] },
        { query: "slow dance music", reason: "Perfect for slow dancing", confidence: 0.85, expectedMood: "romantic", tags: ["slow-dance", "romantic", "gentle"] },
        { query: "R&B love songs", reason: "Smooth R&B romance", confidence: 0.8, expectedMood: "romantic", tags: ["rnb", "love", "smooth"] }
      ]
    };

    return moodPlaylists[mood as keyof typeof moodPlaylists] || [];
  }

  /**
   * Create a smart mix based on multiple tracks
   */
  createSmartMix(tracks: Track[]): DiscoveryRecommendation[] {
    if (tracks.length === 0) return [];
    
    // Analyze all tracks
    const analyses = tracks.map(track => this.analyzeSong(track));
    
    // Calculate average characteristics
    const avgEnergy = analyses.reduce((sum, a) => sum + a.energy, 0) / analyses.length;
    const dominantMood = this.getDominantMood(analyses);
    const commonGenres = this.getCommonGenres(analyses);
    
    const recommendations: DiscoveryRecommendation[] = [];
    
    // Energy-matched recommendations
    if (avgEnergy > 0.7) {
      recommendations.push({
        query: "high energy music mix",
        reason: "Matches your high-energy listening pattern",
        confidence: 0.85,
        expectedMood: "energetic",
        tags: ["high-energy", "mix", "upbeat"]
      });
    } else if (avgEnergy < 0.3) {
      recommendations.push({
        query: "chill music mix",
        reason: "Matches your relaxed listening style",
        confidence: 0.85,
        expectedMood: "relaxed",
        tags: ["chill", "mix", "relaxed"]
      });
    }
    
    // Genre-based recommendations
    commonGenres.forEach(genre => {
      recommendations.push({
        query: `${genre} music discovery`,
        reason: `Based on your ${genre} listening history`,
        confidence: 0.75,
        expectedMood: dominantMood,
        tags: [genre, "discovery", "similar"]
      });
    });
    
    return recommendations.slice(0, 8);
  }

  // Private helper methods

  private estimateEnergy(title: string, artist: string): number {
    const highEnergyWords = ['pump', 'energy', 'power', 'electric', 'fire', 'wild', 'crazy', 'intense', 'explosive'];
    const lowEnergyWords = ['soft', 'quiet', 'gentle', 'calm', 'peaceful', 'slow', 'whisper', 'lullaby'];
    
    const text = `${title} ${artist}`;
    let score = 0.5; // neutral
    
    highEnergyWords.forEach(word => {
      if (text.includes(word)) score += 0.1;
    });
    
    lowEnergyWords.forEach(word => {
      if (text.includes(word)) score -= 0.1;
    });
    
    return Math.max(0, Math.min(1, score));
  }

  private detectMood(title: string, artist: string): SongAnalysis['mood'] {
    const text = `${title} ${artist}`;
    
    const moodKeywords = {
      happy: ['happy', 'joy', 'celebrate', 'fun', 'party', 'dance', 'smile', 'sunshine'],
      sad: ['sad', 'cry', 'tear', 'broken', 'hurt', 'pain', 'lonely', 'miss', 'goodbye'],
      energetic: ['energy', 'power', 'strong', 'wild', 'crazy', 'pump', 'electric', 'fire'],
      relaxed: ['chill', 'calm', 'peace', 'quiet', 'soft', 'gentle', 'mellow', 'smooth'],
      romantic: ['love', 'heart', 'kiss', 'romance', 'forever', 'together', 'baby', 'honey'],
      aggressive: ['fight', 'war', 'angry', 'rage', 'hate', 'destroy', 'kill', 'blood'],
      melancholic: ['alone', 'empty', 'hollow', 'dark', 'shadow', 'rain', 'grey', 'cold'],
      uplifting: ['rise', 'up', 'high', 'soar', 'fly', 'dream', 'hope', 'believe']
    };
    
    let maxScore = 0;
    let detectedMood: SongAnalysis['mood'] = 'happy';
    
    for (const [mood, keywords] of Object.entries(moodKeywords)) {
      const score = keywords.reduce((sum, keyword) => 
        sum + (text.includes(keyword) ? 1 : 0), 0
      );
      
      if (score > maxScore) {
        maxScore = score;
        detectedMood = mood as SongAnalysis['mood'];
      }
    }
    
    return detectedMood;
  }

  private detectGenre(title: string, artist: string): string[] {
    const text = `${title} ${artist}`;
    const genres: string[] = [];
    
    const genreKeywords = {
      pop: ['pop', 'mainstream', 'chart', 'radio'],
      rock: ['rock', 'guitar', 'band', 'alternative'],
      hip_hop: ['rap', 'hip hop', 'trap', 'beats'],
      electronic: ['edm', 'house', 'techno', 'electronic', 'synth'],
      r_and_b: ['r&b', 'soul', 'smooth', 'groove'],
      country: ['country', 'folk', 'acoustic', 'guitar'],
      jazz: ['jazz', 'blues', 'swing', 'saxophone'],
      classical: ['classical', 'orchestra', 'piano', 'symphony']
    };
    
    for (const [genre, keywords] of Object.entries(genreKeywords)) {
      if (keywords.some(keyword => text.includes(keyword))) {
        genres.push(genre.replace('_', ' '));
      }
    }
    
    return genres.length > 0 ? genres : ['pop']; // default to pop
  }

  private estimateTempo(title: string, artist: string): 'slow' | 'medium' | 'fast' {
    const text = `${title} ${artist}`;
    
    const fastWords = ['fast', 'quick', 'speed', 'rush', 'dance', 'party', 'pump'];
    const slowWords = ['slow', 'ballad', 'gentle', 'calm', 'soft', 'quiet'];
    
    const fastScore = fastWords.reduce((sum, word) => sum + (text.includes(word) ? 1 : 0), 0);
    const slowScore = slowWords.reduce((sum, word) => sum + (text.includes(word) ? 1 : 0), 0);
    
    if (fastScore > slowScore) return 'fast';
    if (slowScore > fastScore) return 'slow';
    return 'medium';
  }

  private estimateDanceability(title: string, artist: string): number {
    const text = `${title} ${artist}`;
    const danceWords = ['dance', 'party', 'club', 'groove', 'move', 'shake', 'rhythm', 'beat'];
    
    const score = danceWords.reduce((sum, word) => 
      sum + (text.includes(word) ? 0.15 : 0), 0.4
    );
    
    return Math.max(0, Math.min(1, score));
  }

  private estimateAcousticness(title: string, artist: string): number {
    const text = `${title} ${artist}`;
    const acousticWords = ['acoustic', 'guitar', 'piano', 'unplugged', 'live', 'raw'];
    
    const score = acousticWords.reduce((sum, word) => 
      sum + (text.includes(word) ? 0.2 : 0), 0.3
    );
    
    return Math.max(0, Math.min(1, score));
  }

  private estimateInstrumentalness(title: string, artist: string): number {
    const text = `${title} ${artist}`;
    const instrumentalWords = ['instrumental', 'remix', 'version', 'beat', 'soundtrack'];
    
    const score = instrumentalWords.reduce((sum, word) => 
      sum + (text.includes(word) ? 0.25 : 0), 0.1
    );
    
    return Math.max(0, Math.min(1, score));
  }

  private estimatePopularity(track: Track): number {
    // For now, return a random value
    // In a real implementation, this would check streaming counts, chart positions, etc.
    return Math.floor(Math.random() * 100);
  }

  private getMoodBasedRecommendations(analysis: SongAnalysis): DiscoveryRecommendation[] {
    return this.getMoodPlaylist(analysis.mood).map(rec => ({
      ...rec,
      reason: `Similar ${analysis.mood} mood: ${rec.reason}`
    }));
  }

  private getGenreBasedRecommendations(analysis: SongAnalysis): DiscoveryRecommendation[] {
    const recommendations: DiscoveryRecommendation[] = [];
    
    analysis.genre.forEach(genre => {
      recommendations.push({
        query: `${genre} music`,
        reason: `More ${genre} tracks like this`,
        confidence: 0.75,
        expectedMood: analysis.mood,
        tags: [genre, "similar", "genre-match"]
      });
    });
    
    return recommendations;
  }

  private getEnergyBasedRecommendations(analysis: SongAnalysis): DiscoveryRecommendation[] {
    const recommendations: DiscoveryRecommendation[] = [];
    
    if (analysis.energy > 0.7) {
      recommendations.push({
        query: "high energy songs",
        reason: "Matching the high energy level",
        confidence: 0.8,
        expectedMood: "energetic",
        tags: ["high-energy", "upbeat", "energetic"]
      });
    } else if (analysis.energy < 0.3) {
      recommendations.push({
        query: "low energy chill music",
        reason: "Maintaining the relaxed energy",
        confidence: 0.8,
        expectedMood: "relaxed",
        tags: ["low-energy", "chill", "relaxed"]
      });
    }
    
    return recommendations;
  }

  private getArtistBasedRecommendations(track: Track): DiscoveryRecommendation[] {
    const artist = track.info.author;
    
    return [{
      query: `${artist} similar artists`,
      reason: `Artists similar to ${artist}`,
      confidence: 0.85,
      expectedMood: "similar",
      tags: ["artist-similar", "discovery", artist.toLowerCase()]
    }];
  }

  private getDominantMood(analyses: SongAnalysis[]): string {
    const moodCounts: Record<string, number> = {};
    
    analyses.forEach(analysis => {
      moodCounts[analysis.mood] = (moodCounts[analysis.mood] || 0) + 1;
    });
    
    return Object.entries(moodCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'happy';
  }

  private getCommonGenres(analyses: SongAnalysis[]): string[] {
    const genreCounts: Record<string, number> = {};
    
    analyses.forEach(analysis => {
      analysis.genre.forEach(genre => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });
    
    return Object.entries(genreCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([genre]) => genre);
  }
}
