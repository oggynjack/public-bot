export interface AIRecommendation {
  query: string;
  confidence: number;
  reasoning: string;
  genre?: string;
  mood?: string;
  language?: string;
  region?: string;
  artist?: string;
}

export interface MusicContext {
  currentSong?: string;
  recentSongs?: string[];
  userPreferences?: string[];
  timeOfDay?: string;
  mood?: string;
  userLanguage?: string;
  guildLanguage?: string;
  skipCount?: number;
}

export class AIService {
  // Enhanced music patterns and keywords with multi-language support
  private moodKeywords = {
    happy: {
      en: ['upbeat', 'cheerful', 'energetic', 'fun', 'party', 'dance', 'joyful', 'excited'],
      es: ['alegre', 'animado', 'energético', 'divertido', 'fiesta', 'baile', 'contento'],
      fr: ['joyeux', 'énergique', 'amusant', 'fête', 'danse', 'gai', 'content'],
      de: ['fröhlich', 'energisch', 'lustig', 'party', 'tanz', 'glücklich', 'lebhaft'],
    },
    sad: {
      en: ['emotional', 'melancholy', 'heartbreak', 'slow', 'ballad', 'tearful', 'depressed'],
      es: ['emocional', 'melancolía', 'desamor', 'lento', 'balada', 'triste', 'deprimido'],
      fr: ['émotionnel', 'mélancolique', 'chagrin', 'lent', 'ballade', 'triste', 'déprimé'],
      de: ['emotional', 'melancholisch', 'herzschmerz', 'langsam', 'ballade', 'traurig'],
    },
    relaxed: {
      en: ['chill', 'calm', 'ambient', 'lo-fi', 'peaceful', 'soft', 'mellow', 'soothing'],
      es: ['relajado', 'tranquilo', 'ambiente', 'pacífico', 'suave', 'calmante'],
      fr: ['détendu', 'calme', 'ambiant', 'paisible', 'doux', 'apaisant'],
      de: ['entspannt', 'ruhig', 'ambient', 'friedlich', 'sanft', 'beruhigend'],
    },
    energetic: {
      en: ['rock', 'metal', 'punk', 'electronic', 'workout', 'gym', 'intense', 'powerful'],
      es: ['rock', 'metal', 'punk', 'electrónico', 'ejercicio', 'intenso', 'poderoso'],
      fr: ['rock', 'métal', 'punk', 'électronique', 'sport', 'intense', 'puissant'],
      de: ['rock', 'metal', 'punk', 'elektronisch', 'workout', 'intensiv', 'kraftvoll'],
    },
    romantic: {
      en: ['love', 'romantic', 'valentine', 'intimate', 'sweet', 'passionate', 'tender'],
      es: ['amor', 'romántico', 'san valentín', 'íntimo', 'dulce', 'apasionado', 'tierno'],
      fr: ['amour', 'romantique', 'saint-valentin', 'intime', 'doux', 'passionné', 'tendre'],
      de: ['liebe', 'romantisch', 'valentinstag', 'intim', 'süß', 'leidenschaftlich'],
    },
    focus: {
      en: ['instrumental', 'classical', 'piano', 'study', 'concentration', 'meditation'],
      es: ['instrumental', 'clásico', 'piano', 'estudio', 'concentración', 'meditación'],
      fr: ['instrumental', 'classique', 'piano', 'étude', 'concentration', 'méditation'],
      de: ['instrumental', 'klassisch', 'klavier', 'studium', 'konzentration', 'meditation'],
    }
  };

  private genreKeywords = {
    pop: {
      en: ['pop', 'mainstream', 'chart', 'radio', 'commercial', 'catchy'],
      es: ['pop', 'corriente principal', 'radio', 'comercial', 'pegadizo'],
      fr: ['pop', 'grand public', 'radio', 'commercial', 'accrocheur'],
      de: ['pop', 'mainstream', 'radio', 'kommerziell', 'eingängig'],
    },
    rock: {
      en: ['rock', 'alternative', 'indie', 'grunge', 'classic rock', 'hard rock'],
      es: ['rock', 'alternativo', 'indie', 'grunge', 'rock clásico', 'hard rock'],
      fr: ['rock', 'alternatif', 'indé', 'grunge', 'rock classique', 'hard rock'],
      de: ['rock', 'alternativ', 'indie', 'grunge', 'klassischer rock', 'hard rock'],
    },
    hiphop: {
      en: ['rap', 'hip hop', 'trap', 'urban', 'freestyle', 'beats'],
      es: ['rap', 'hip hop', 'trap', 'urbano', 'freestyle', 'beats'],
      fr: ['rap', 'hip hop', 'trap', 'urbain', 'freestyle', 'beats'],
      de: ['rap', 'hip hop', 'trap', 'urban', 'freestyle', 'beats'],
    },
    electronic: {
      en: ['edm', 'house', 'techno', 'dubstep', 'electronic', 'synth', 'dance'],
      es: ['edm', 'house', 'techno', 'dubstep', 'electrónico', 'synth', 'dance'],
      fr: ['edm', 'house', 'techno', 'dubstep', 'électronique', 'synth', 'dance'],
      de: ['edm', 'house', 'techno', 'dubstep', 'elektronisch', 'synth', 'dance'],
    },
    jazz: {
      en: ['jazz', 'smooth', 'swing', 'blues', 'bebop', 'fusion'],
      es: ['jazz', 'suave', 'swing', 'blues', 'bebop', 'fusión'],
      fr: ['jazz', 'smooth', 'swing', 'blues', 'bebop', 'fusion'],
      de: ['jazz', 'smooth', 'swing', 'blues', 'bebop', 'fusion'],
    },
    classical: {
      en: ['classical', 'orchestra', 'symphony', 'piano', 'violin', 'baroque', 'opera'],
      es: ['clásico', 'orquesta', 'sinfonía', 'piano', 'violín', 'barroco', 'ópera'],
      fr: ['classique', 'orchestre', 'symphonie', 'piano', 'violon', 'baroque', 'opéra'],
      de: ['klassisch', 'orchester', 'symphonie', 'klavier', 'violine', 'barock', 'oper'],
    },
    country: {
      en: ['country', 'folk', 'acoustic', 'americana', 'bluegrass', 'western'],
      es: ['country', 'folk', 'acústico', 'americana', 'bluegrass', 'western'],
      fr: ['country', 'folk', 'acoustique', 'americana', 'bluegrass', 'western'],
      de: ['country', 'folk', 'akustisch', 'americana', 'bluegrass', 'western'],
    },
    rnb: {
      en: ['r&b', 'soul', 'funk', 'motown', 'neo-soul', 'contemporary'],
      es: ['r&b', 'soul', 'funk', 'motown', 'neo-soul', 'contemporáneo'],
      fr: ['r&b', 'soul', 'funk', 'motown', 'neo-soul', 'contemporain'],
      de: ['r&b', 'soul', 'funk', 'motown', 'neo-soul', 'zeitgenössisch'],
    },
    punjabi: {
      en: ['punjabi', 'bhangra', 'punjabi music', 'sikh music', 'punjab songs'],
      pa: ['ਪੰਜਾਬੀ', 'ਭੰਗੜਾ', 'ਪੰਜਾਬੀ ਗੀਤ', 'ਸਿੱਖ ਸੰਗੀਤ'],
      hi: ['पंजाबी', 'भांगड़ा', 'पंजाबी संगीत', 'सिख संगीत'],
      ur: ['پنجابی', 'بھنگڑا', 'پنجابی موسیقی', 'سکھ موسیقی'],
    },
    bollywood: {
      en: ['bollywood', 'hindi film', 'indian cinema', 'playback', 'filmi'],
      hi: ['बॉलीवुड', 'हिंदी फिल्म', 'भारतीय सिनेमा', 'प्लेबैक'],
      pa: ['ਬਾਲੀਵੁੱਡ', 'ਹਿੰਦੀ ਫਿਲਮ', 'ਭਾਰਤੀ ਸਿਨੇਮਾ'],
    },
    sufi: {
      en: ['sufi', 'qawwali', 'spiritual', 'mystical', 'devotional'],
      pa: ['ਸੂਫੀ', 'ਕਵਾਲੀ', 'ਅਧਿਆਤਮਿਕ', 'ਭਗਤੀ'],
      hi: ['सूफी', 'कव्वाली', 'आध्यात्मिक', 'भक्ति'],
      ur: ['صوفی', 'قوالی', 'روحانی', 'عرفانی'],
    }
  };

  private regionalKeywords = {
    latin: ['latino', 'reggaeton', 'salsa', 'bachata', 'merengue', 'cumbia', 'latin'],
    asian: ['k-pop', 'j-pop', 'mandarin', 'cantonese', 'korean', 'japanese', 'chinese'],
    european: ['european', 'eurovision', 'deutsch', 'français', 'italiano', 'español'],
    african: ['afrobeat', 'african', 'amapiano', 'highlife', 'soukous'],
    indian: ['bollywood', 'indian classical', 'bhangra', 'qawwali', 'carnatic'],
    punjabi: ['punjabi', 'bhangra', 'dhol', 'tumbi', 'punjab', 'sikh music', 'gurdwara', 'sufi punjabi'],
    arabic: ['arabic', 'middle eastern', 'oud', 'qanun', 'maqam']
  };

  private languageKeywords = {
    english: ['english', 'american', 'british', 'australian'],
    spanish: ['spanish', 'español', 'castellano', 'hispanic', 'latino'],
    french: ['french', 'français', 'francophone'],
    german: ['german', 'deutsch', 'germanic'],
    japanese: ['japanese', '日本語', 'nihongo', 'j-pop'],
    korean: ['korean', '한국어', 'hangul', 'k-pop'],
    mandarin: ['mandarin', 'chinese', '中文', 'c-pop'],
    portuguese: ['portuguese', 'português', 'brasileiro'],
    italian: ['italian', 'italiano'],
    russian: ['russian', 'русский'],
    arabic: ['arabic', 'عربي', 'مسيقى'],
    hindi: ['hindi', 'हिंदी', 'bollywood', 'hindustani'],
    punjabi: ['punjabi', 'ਪੰਜਾਬੀ', 'bhangra', 'dhol', 'punjab', 'sikh', 'gurdwara', 'sufi', 'qawwali punjabi'],
    turkish: ['turkish', 'türkçe', 'ottoman'],
    urdu: ['urdu', 'اردو', 'ghazal', 'qawwali']
  };

  private artistsByRegion = {
    latin: ['Bad Bunny', 'J Balvin', 'Shakira', 'Manu Chao', 'Jesse & Joy', 'Ozuna'],
    asian: ['BTS', 'BLACKPINK', 'Jay Chou', 'TWICE', 'Stray Kids', 'NewJeans'],
    european: ['Stromae', 'Rammstein', 'ABBA', 'Coldplay', 'Adele'],
    indian: ['A.R. Rahman', 'Shreya Ghoshal', 'Arijit Singh', 'Lata Mangeshkar'],
    punjabi: ['Karan Aujla', 'Sidhu Moose Wala', 'Diljit Dosanjh', 'Ammy Virk', 'Parmish Verma', 'Jass Manak', 'Guri', 'Mankirt Aulakh', 'Ranjit Bawa', 'Gippy Grewal', 'Babbu Maan', 'Amrit Maan', 'Jordan Sandhu', 'Kulwinder Billa', 'Ninja'],
    arabic: ['Fairuz', 'Amr Diab', 'Nancy Ajram', 'Umm Kulthum', 'Mohammed Abdel Wahab'],
    turkish: ['Tarkan', 'Sezen Aksu', 'Müslüm Gürses', 'Barış Manço'],
    russian: ['Alla Pugacheva', 'Zemfira', 'Dima Bilan', 'Polina Gagarina']
  };

  /**
   * Enhanced process natural language music request with multi-language and context support
   */
  async processRequest(
    request: string, 
    context: MusicContext = {}
  ): Promise<AIRecommendation[]> {
    const recommendations: AIRecommendation[] = [];
    const lowerRequest = request.toLowerCase();
    const userLang = this.detectLanguageContext(context);

    // Direct song/artist recognition
    const directMatch = this.extractDirectRequest(lowerRequest);
    if (directMatch) {
      recommendations.push({
        query: directMatch,
        confidence: 0.95,
        reasoning: "Direct song or artist request detected"
      });
    }

    // Language-based recommendations
    const languageMatch = this.detectLanguage(lowerRequest);
    if (languageMatch) {
      recommendations.push(...this.generateLanguageRecommendations(languageMatch, context));
    }

    // Region-based recommendations
    const regionMatch = this.detectRegion(lowerRequest);
    if (regionMatch) {
      recommendations.push(...this.generateRegionRecommendations(regionMatch, context));
    }

    // Mood-based recommendations (with language context)
    const moodMatch = this.detectMood(lowerRequest, userLang);
    if (moodMatch) {
      recommendations.push(...this.generateMoodRecommendations(moodMatch, context));
    }

    // Genre-based recommendations (with language context)
    const genreMatch = this.detectGenre(lowerRequest, userLang);
    if (genreMatch) {
      recommendations.push(...this.generateGenreRecommendations(genreMatch, context));
    }

    // Handle skip-based auto-suggestions
    if (context.skipCount && context.skipCount > 0) {
      recommendations.push(...this.generateSkipBasedRecommendations(context));
    }

    // If no specific matches, generate contextual recommendations
    if (recommendations.length === 0) {
      recommendations.push(...this.generateContextualRecommendations(request, context));
    }

    // Enhanced recommendations with up to 15 suggestions for premium users
    const maxRecommendations = this.getMaxRecommendations(context);
    return recommendations
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, maxRecommendations);
  }

  private detectLanguageContext(context: MusicContext): string {
    return context.guildLanguage || context.userLanguage || 'en';
  }

  private getMaxRecommendations(context: MusicContext): number {
    // Enhanced thresholds: 10-15 recommendations
    if (context.skipCount && context.skipCount > 0) {
      return Math.min(15, Math.max(10, context.skipCount * 2));
    }
    return 12; // Default enhanced amount
  }

  private extractDirectRequest(request: string): string | null {
    const playPatterns = [
      /(?:play|put on|start)\s+(.+)/i,
      /(?:i want to hear|i'd like)\s+(.+)/i,
      /(?:can you play|please play)\s+(.+)/i
    ];

    for (const pattern of playPatterns) {
      const match = request.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    const controlWords = ['mood', 'feeling', 'vibe', 'something', 'music', 'song'];
    if (!controlWords.some(word => request.includes(word))) {
      return request;
    }

    return null;
  }

  private detectMood(request: string, userLang: string = 'en'): string | null {
    for (const [mood, translations] of Object.entries(this.moodKeywords)) {
      const keywords = translations[userLang as keyof typeof translations] || translations.en;
      if (keywords.some((keyword: string) => request.includes(keyword))) {
        return mood;
      }
    }
    return null;
  }

  private detectGenre(request: string, userLang: string = 'en'): string | null {
    for (const [genre, translations] of Object.entries(this.genreKeywords)) {
      const keywords = translations[userLang as keyof typeof translations] || translations.en;
      if (keywords.some((keyword: string) => request.includes(keyword))) {
        return genre;
      }
    }
    return null;
  }

  private detectLanguage(request: string): string | null {
    for (const [language, keywords] of Object.entries(this.languageKeywords)) {
      if (keywords.some((keyword: string) => request.includes(keyword))) {
        return language;
      }
    }
    return null;
  }

  private detectRegion(request: string): string | null {
    for (const [region, keywords] of Object.entries(this.regionalKeywords)) {
      if (keywords.some((keyword: string) => request.includes(keyword))) {
        return region;
      }
    }
    return null;
  }

  private generateLanguageRecommendations(language: string, context: MusicContext): AIRecommendation[] {
    const languageQueries = {
      spanish: ['música en español', 'canciones latinos', 'spanish hits'],
      french: ['musique française', 'chansons françaises', 'french music'],
      german: ['deutsche musik', 'german songs', 'musik auf deutsch'],
      japanese: ['j-pop music', 'japanese songs', 'anime music'],
      korean: ['k-pop music', 'korean songs', '케이팝'],
      mandarin: ['c-pop music', 'chinese songs', '中文歌曲'],
      english: ['english songs', 'american music', 'british music'],
      portuguese: ['música portuguesa', 'brazilian music', 'portuguese songs'],
      italian: ['musica italiana', 'italian songs', 'canzoni italiane'],
      russian: ['русская музыка', 'russian music', 'russian songs'],
      arabic: ['موسيقى عربية', 'arabic music', 'middle eastern music'],
      hindi: ['bollywood music', 'hindi songs', 'indian music']
    };

    const queries = languageQueries[language as keyof typeof languageQueries] || [];
    
    return queries.map((query, index) => ({
      query,
      confidence: 0.85 - (index * 0.1),
      reasoning: `Language-based recommendation for ${language} music`,
      language
    }));
  }

  private generateRegionRecommendations(region: string, context: MusicContext): AIRecommendation[] {
    const regionQueries = {
      latin: ['reggaeton hits', 'latin music', 'música latina', 'salsa bachata'],
      asian: ['k-pop j-pop', 'asian music hits', 'mandarin cantonese songs'],
      european: ['european music', 'eurovision hits', 'european pop'],
      african: ['afrobeat music', 'african rhythms', 'amapiano hits'],
      indian: ['bollywood hits', 'indian classical', 'bhangra music'],
      arabic: ['arabic classics', 'middle eastern music', 'oud instrumental']
    };

    const queries = regionQueries[region as keyof typeof regionQueries] || [];
    const artists = this.artistsByRegion[region as keyof typeof this.artistsByRegion] || [];
    
    const recommendations: AIRecommendation[] = [];
    
    // Add region-based queries
    queries.forEach((query, index) => {
      recommendations.push({
        query,
        confidence: 0.82 - (index * 0.08),
        reasoning: `Regional music recommendation for ${region}`,
        region
      });
    });

    // Add popular artists from the region
    artists.slice(0, 3).forEach((artist, index) => {
      recommendations.push({
        query: `${artist} popular songs`,
        confidence: 0.78 - (index * 0.05),
        reasoning: `Popular artist from ${region} region`,
        artist,
        region
      });
    });

    return recommendations;
  }

  private generateSkipBasedRecommendations(context: MusicContext): AIRecommendation[] {
    const recommendations: AIRecommendation[] = [];
    const skipCount = context.skipCount || 1;
    
    // Generate recommendations based on current song and user preferences
    if (context.currentSong) {
      recommendations.push({
        query: `songs like ${context.currentSong}`,
        confidence: 0.88,
        reasoning: `Similar to skipped song: ${context.currentSong}`
      });

      recommendations.push({
        query: `${context.currentSong} artist similar songs`,
        confidence: 0.85,
        reasoning: `From same artist as skipped song`
      });
    }

    // Add genre continuation if recent songs suggest a pattern
    if (context.recentSongs && context.recentSongs.length > 0) {
      const genres = ['pop', 'rock', 'hip hop', 'electronic', 'indie'];
      const randomGenre = genres[Math.floor(Math.random() * genres.length)];
      
      recommendations.push({
        query: `${randomGenre} music similar vibe`,
        confidence: 0.82,
        reasoning: `Genre continuation based on recent listening`
      });
    }

    // Add time-based recommendations
    const hour = new Date().getHours();
    let timeBasedQuery = '';
    
    if (hour >= 6 && hour < 12) {
      timeBasedQuery = 'morning energy music';
    } else if (hour >= 12 && hour < 17) {
      timeBasedQuery = 'afternoon vibe music';
    } else if (hour >= 17 && hour < 22) {
      timeBasedQuery = 'evening chill music';
    } else {
      timeBasedQuery = 'late night music';
    }

    recommendations.push({
      query: timeBasedQuery,
      confidence: 0.75,
      reasoning: `Time-appropriate music for ${hour}:00`
    });

    return recommendations.slice(0, skipCount * 2);
  }

  private generateMoodRecommendations(mood: string, context: MusicContext): AIRecommendation[] {
    const moodQueries = {
      happy: ['upbeat pop songs', 'feel good music', 'happy songs 2024'],
      sad: ['sad songs playlist', 'emotional ballads', 'heartbreak songs'],
      relaxed: ['chill music', 'lo-fi hip hop', 'relaxing instrumental'],
      energetic: ['workout music', 'high energy songs', 'pump up music'],
      romantic: ['love songs', 'romantic music', 'date night playlist'],
      focus: ['study music', 'instrumental focus', 'concentration music']
    };

    const queries = moodQueries[mood as keyof typeof moodQueries] || [];
    
    return queries.map((query, index) => ({
      query,
      confidence: 0.8 - (index * 0.1),
      reasoning: `Mood-based recommendation for ${mood} feeling`,
      mood
    }));
  }

  private generateGenreRecommendations(genre: string, context: MusicContext): AIRecommendation[] {
    const genreQueries = {
      pop: ['top pop songs 2024', 'popular music', 'mainstream hits'],
      rock: ['rock music', 'alternative rock', 'indie rock'],
      hiphop: ['hip hop music', 'rap songs', 'urban music'],
      electronic: ['electronic music', 'EDM hits', 'house music'],
      jazz: ['jazz music', 'smooth jazz', 'jazz classics'],
      classical: ['classical music', 'orchestra music', 'piano classics'],
      country: ['country music', 'folk songs', 'acoustic music'],
      rnb: ['R&B music', 'soul music', 'rhythm and blues']
    };

    const queries = genreQueries[genre as keyof typeof genreQueries] || [];
    
    return queries.map((query, index) => ({
      query,
      confidence: 0.75 - (index * 0.1),
      reasoning: `Genre-based recommendation for ${genre}`,
      genre
    }));
  }

  private generateContextualRecommendations(request: string, context: MusicContext): AIRecommendation[] {
    const recommendations: AIRecommendation[] = [];
    
    recommendations.push({
      query: request,
      confidence: 0.6,
      reasoning: 'Direct search based on user request'
    });

    recommendations.push(
      {
        query: 'popular music 2024',
        confidence: 0.4,
        reasoning: 'Popular music fallback recommendation'
      },
      {
        query: 'trending songs',
        confidence: 0.3,
        reasoning: 'Trending music fallback recommendation'
      }
    );

    return recommendations;
  }
}
