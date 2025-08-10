
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Playlist
 * 
 */
export type Playlist = $Result.DefaultSelection<Prisma.$PlaylistPayload>
/**
 * Model Track
 * 
 */
export type Track = $Result.DefaultSelection<Prisma.$TrackPayload>
/**
 * Model Bot
 * 
 */
export type Bot = $Result.DefaultSelection<Prisma.$BotPayload>
/**
 * Model Guild
 * 
 */
export type Guild = $Result.DefaultSelection<Prisma.$GuildPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model PremiumFeature
 * 
 */
export type PremiumFeature = $Result.DefaultSelection<Prisma.$PremiumFeaturePayload>
/**
 * Model GuildBotSettings
 * 
 */
export type GuildBotSettings = $Result.DefaultSelection<Prisma.$GuildBotSettingsPayload>
/**
 * Model BotInstance
 * 
 */
export type BotInstance = $Result.DefaultSelection<Prisma.$BotInstancePayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model Plan
 * 
 */
export type Plan = $Result.DefaultSelection<Prisma.$PlanPayload>
/**
 * Model GuildOwner
 * 
 */
export type GuildOwner = $Result.DefaultSelection<Prisma.$GuildOwnerPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model OtpVerification
 * 
 */
export type OtpVerification = $Result.DefaultSelection<Prisma.$OtpVerificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const PremiumPlan: {
  Free: 'Free',
  Premium: 'Premium',
  PremiumPlus: 'PremiumPlus',
  TrialPremium: 'TrialPremium'
};

export type PremiumPlan = (typeof PremiumPlan)[keyof typeof PremiumPlan]


export const BotPermission: {
  RESTART: 'RESTART',
  STOP: 'STOP',
  START: 'START',
  CHANGE_NAME: 'CHANGE_NAME',
  CHANGE_AVATAR: 'CHANGE_AVATAR',
  CHANGE_STATUS: 'CHANGE_STATUS',
  CHANGE_ACTIVITY: 'CHANGE_ACTIVITY',
  MASTER_CONTROL: 'MASTER_CONTROL'
};

export type BotPermission = (typeof BotPermission)[keyof typeof BotPermission]

}

export type PremiumPlan = $Enums.PremiumPlan

export const PremiumPlan: typeof $Enums.PremiumPlan

export type BotPermission = $Enums.BotPermission

export const BotPermission: typeof $Enums.BotPermission

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Playlists
 * const playlists = await prisma.playlist.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Playlists
   * const playlists = await prisma.playlist.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.playlist`: Exposes CRUD operations for the **Playlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Playlists
    * const playlists = await prisma.playlist.findMany()
    * ```
    */
  get playlist(): Prisma.PlaylistDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.track`: Exposes CRUD operations for the **Track** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tracks
    * const tracks = await prisma.track.findMany()
    * ```
    */
  get track(): Prisma.TrackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bot`: Exposes CRUD operations for the **Bot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bots
    * const bots = await prisma.bot.findMany()
    * ```
    */
  get bot(): Prisma.BotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guild`: Exposes CRUD operations for the **Guild** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Guilds
    * const guilds = await prisma.guild.findMany()
    * ```
    */
  get guild(): Prisma.GuildDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.premiumFeature`: Exposes CRUD operations for the **PremiumFeature** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PremiumFeatures
    * const premiumFeatures = await prisma.premiumFeature.findMany()
    * ```
    */
  get premiumFeature(): Prisma.PremiumFeatureDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guildBotSettings`: Exposes CRUD operations for the **GuildBotSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GuildBotSettings
    * const guildBotSettings = await prisma.guildBotSettings.findMany()
    * ```
    */
  get guildBotSettings(): Prisma.GuildBotSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.botInstance`: Exposes CRUD operations for the **BotInstance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BotInstances
    * const botInstances = await prisma.botInstance.findMany()
    * ```
    */
  get botInstance(): Prisma.BotInstanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.plan`: Exposes CRUD operations for the **Plan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Plans
    * const plans = await prisma.plan.findMany()
    * ```
    */
  get plan(): Prisma.PlanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.guildOwner`: Exposes CRUD operations for the **GuildOwner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GuildOwners
    * const guildOwners = await prisma.guildOwner.findMany()
    * ```
    */
  get guildOwner(): Prisma.GuildOwnerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.otpVerification`: Exposes CRUD operations for the **OtpVerification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OtpVerifications
    * const otpVerifications = await prisma.otpVerification.findMany()
    * ```
    */
  get otpVerification(): Prisma.OtpVerificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Playlist: 'Playlist',
    Track: 'Track',
    Bot: 'Bot',
    Guild: 'Guild',
    User: 'User',
    PremiumFeature: 'PremiumFeature',
    GuildBotSettings: 'GuildBotSettings',
    BotInstance: 'BotInstance',
    Payment: 'Payment',
    Plan: 'Plan',
    GuildOwner: 'GuildOwner',
    Admin: 'Admin',
    OtpVerification: 'OtpVerification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "playlist" | "track" | "bot" | "guild" | "user" | "premiumFeature" | "guildBotSettings" | "botInstance" | "payment" | "plan" | "guildOwner" | "admin" | "otpVerification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Playlist: {
        payload: Prisma.$PlaylistPayload<ExtArgs>
        fields: Prisma.PlaylistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlaylistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlaylistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          findFirst: {
            args: Prisma.PlaylistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlaylistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          findMany: {
            args: Prisma.PlaylistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>[]
          }
          create: {
            args: Prisma.PlaylistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          createMany: {
            args: Prisma.PlaylistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlaylistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>[]
          }
          delete: {
            args: Prisma.PlaylistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          update: {
            args: Prisma.PlaylistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          deleteMany: {
            args: Prisma.PlaylistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlaylistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlaylistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>[]
          }
          upsert: {
            args: Prisma.PlaylistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlaylistPayload>
          }
          aggregate: {
            args: Prisma.PlaylistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlaylist>
          }
          groupBy: {
            args: Prisma.PlaylistGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlaylistGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlaylistCountArgs<ExtArgs>
            result: $Utils.Optional<PlaylistCountAggregateOutputType> | number
          }
        }
      }
      Track: {
        payload: Prisma.$TrackPayload<ExtArgs>
        fields: Prisma.TrackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TrackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TrackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload>
          }
          findFirst: {
            args: Prisma.TrackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TrackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload>
          }
          findMany: {
            args: Prisma.TrackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload>[]
          }
          create: {
            args: Prisma.TrackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload>
          }
          createMany: {
            args: Prisma.TrackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TrackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload>[]
          }
          delete: {
            args: Prisma.TrackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload>
          }
          update: {
            args: Prisma.TrackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload>
          }
          deleteMany: {
            args: Prisma.TrackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TrackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TrackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload>[]
          }
          upsert: {
            args: Prisma.TrackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TrackPayload>
          }
          aggregate: {
            args: Prisma.TrackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTrack>
          }
          groupBy: {
            args: Prisma.TrackGroupByArgs<ExtArgs>
            result: $Utils.Optional<TrackGroupByOutputType>[]
          }
          count: {
            args: Prisma.TrackCountArgs<ExtArgs>
            result: $Utils.Optional<TrackCountAggregateOutputType> | number
          }
        }
      }
      Bot: {
        payload: Prisma.$BotPayload<ExtArgs>
        fields: Prisma.BotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>
          }
          findFirst: {
            args: Prisma.BotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>
          }
          findMany: {
            args: Prisma.BotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>[]
          }
          create: {
            args: Prisma.BotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>
          }
          createMany: {
            args: Prisma.BotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>[]
          }
          delete: {
            args: Prisma.BotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>
          }
          update: {
            args: Prisma.BotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>
          }
          deleteMany: {
            args: Prisma.BotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>[]
          }
          upsert: {
            args: Prisma.BotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotPayload>
          }
          aggregate: {
            args: Prisma.BotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBot>
          }
          groupBy: {
            args: Prisma.BotGroupByArgs<ExtArgs>
            result: $Utils.Optional<BotGroupByOutputType>[]
          }
          count: {
            args: Prisma.BotCountArgs<ExtArgs>
            result: $Utils.Optional<BotCountAggregateOutputType> | number
          }
        }
      }
      Guild: {
        payload: Prisma.$GuildPayload<ExtArgs>
        fields: Prisma.GuildFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuildFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuildFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>
          }
          findFirst: {
            args: Prisma.GuildFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuildFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>
          }
          findMany: {
            args: Prisma.GuildFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>[]
          }
          create: {
            args: Prisma.GuildCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>
          }
          createMany: {
            args: Prisma.GuildCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GuildCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>[]
          }
          delete: {
            args: Prisma.GuildDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>
          }
          update: {
            args: Prisma.GuildUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>
          }
          deleteMany: {
            args: Prisma.GuildDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuildUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GuildUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>[]
          }
          upsert: {
            args: Prisma.GuildUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildPayload>
          }
          aggregate: {
            args: Prisma.GuildAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuild>
          }
          groupBy: {
            args: Prisma.GuildGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuildGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuildCountArgs<ExtArgs>
            result: $Utils.Optional<GuildCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      PremiumFeature: {
        payload: Prisma.$PremiumFeaturePayload<ExtArgs>
        fields: Prisma.PremiumFeatureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PremiumFeatureFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumFeaturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PremiumFeatureFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumFeaturePayload>
          }
          findFirst: {
            args: Prisma.PremiumFeatureFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumFeaturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PremiumFeatureFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumFeaturePayload>
          }
          findMany: {
            args: Prisma.PremiumFeatureFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumFeaturePayload>[]
          }
          create: {
            args: Prisma.PremiumFeatureCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumFeaturePayload>
          }
          createMany: {
            args: Prisma.PremiumFeatureCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PremiumFeatureCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumFeaturePayload>[]
          }
          delete: {
            args: Prisma.PremiumFeatureDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumFeaturePayload>
          }
          update: {
            args: Prisma.PremiumFeatureUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumFeaturePayload>
          }
          deleteMany: {
            args: Prisma.PremiumFeatureDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PremiumFeatureUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PremiumFeatureUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumFeaturePayload>[]
          }
          upsert: {
            args: Prisma.PremiumFeatureUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PremiumFeaturePayload>
          }
          aggregate: {
            args: Prisma.PremiumFeatureAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePremiumFeature>
          }
          groupBy: {
            args: Prisma.PremiumFeatureGroupByArgs<ExtArgs>
            result: $Utils.Optional<PremiumFeatureGroupByOutputType>[]
          }
          count: {
            args: Prisma.PremiumFeatureCountArgs<ExtArgs>
            result: $Utils.Optional<PremiumFeatureCountAggregateOutputType> | number
          }
        }
      }
      GuildBotSettings: {
        payload: Prisma.$GuildBotSettingsPayload<ExtArgs>
        fields: Prisma.GuildBotSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuildBotSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildBotSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuildBotSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildBotSettingsPayload>
          }
          findFirst: {
            args: Prisma.GuildBotSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildBotSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuildBotSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildBotSettingsPayload>
          }
          findMany: {
            args: Prisma.GuildBotSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildBotSettingsPayload>[]
          }
          create: {
            args: Prisma.GuildBotSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildBotSettingsPayload>
          }
          createMany: {
            args: Prisma.GuildBotSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GuildBotSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildBotSettingsPayload>[]
          }
          delete: {
            args: Prisma.GuildBotSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildBotSettingsPayload>
          }
          update: {
            args: Prisma.GuildBotSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildBotSettingsPayload>
          }
          deleteMany: {
            args: Prisma.GuildBotSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuildBotSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GuildBotSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildBotSettingsPayload>[]
          }
          upsert: {
            args: Prisma.GuildBotSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildBotSettingsPayload>
          }
          aggregate: {
            args: Prisma.GuildBotSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuildBotSettings>
          }
          groupBy: {
            args: Prisma.GuildBotSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuildBotSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuildBotSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<GuildBotSettingsCountAggregateOutputType> | number
          }
        }
      }
      BotInstance: {
        payload: Prisma.$BotInstancePayload<ExtArgs>
        fields: Prisma.BotInstanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BotInstanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotInstancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BotInstanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotInstancePayload>
          }
          findFirst: {
            args: Prisma.BotInstanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotInstancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BotInstanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotInstancePayload>
          }
          findMany: {
            args: Prisma.BotInstanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotInstancePayload>[]
          }
          create: {
            args: Prisma.BotInstanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotInstancePayload>
          }
          createMany: {
            args: Prisma.BotInstanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BotInstanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotInstancePayload>[]
          }
          delete: {
            args: Prisma.BotInstanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotInstancePayload>
          }
          update: {
            args: Prisma.BotInstanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotInstancePayload>
          }
          deleteMany: {
            args: Prisma.BotInstanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BotInstanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BotInstanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotInstancePayload>[]
          }
          upsert: {
            args: Prisma.BotInstanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BotInstancePayload>
          }
          aggregate: {
            args: Prisma.BotInstanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBotInstance>
          }
          groupBy: {
            args: Prisma.BotInstanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<BotInstanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.BotInstanceCountArgs<ExtArgs>
            result: $Utils.Optional<BotInstanceCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      Plan: {
        payload: Prisma.$PlanPayload<ExtArgs>
        fields: Prisma.PlanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findFirst: {
            args: Prisma.PlanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          findMany: {
            args: Prisma.PlanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          create: {
            args: Prisma.PlanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          createMany: {
            args: Prisma.PlanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          delete: {
            args: Prisma.PlanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          update: {
            args: Prisma.PlanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          deleteMany: {
            args: Prisma.PlanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>[]
          }
          upsert: {
            args: Prisma.PlanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanPayload>
          }
          aggregate: {
            args: Prisma.PlanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlan>
          }
          groupBy: {
            args: Prisma.PlanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanCountArgs<ExtArgs>
            result: $Utils.Optional<PlanCountAggregateOutputType> | number
          }
        }
      }
      GuildOwner: {
        payload: Prisma.$GuildOwnerPayload<ExtArgs>
        fields: Prisma.GuildOwnerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GuildOwnerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildOwnerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GuildOwnerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildOwnerPayload>
          }
          findFirst: {
            args: Prisma.GuildOwnerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildOwnerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GuildOwnerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildOwnerPayload>
          }
          findMany: {
            args: Prisma.GuildOwnerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildOwnerPayload>[]
          }
          create: {
            args: Prisma.GuildOwnerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildOwnerPayload>
          }
          createMany: {
            args: Prisma.GuildOwnerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GuildOwnerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildOwnerPayload>[]
          }
          delete: {
            args: Prisma.GuildOwnerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildOwnerPayload>
          }
          update: {
            args: Prisma.GuildOwnerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildOwnerPayload>
          }
          deleteMany: {
            args: Prisma.GuildOwnerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GuildOwnerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GuildOwnerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildOwnerPayload>[]
          }
          upsert: {
            args: Prisma.GuildOwnerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GuildOwnerPayload>
          }
          aggregate: {
            args: Prisma.GuildOwnerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGuildOwner>
          }
          groupBy: {
            args: Prisma.GuildOwnerGroupByArgs<ExtArgs>
            result: $Utils.Optional<GuildOwnerGroupByOutputType>[]
          }
          count: {
            args: Prisma.GuildOwnerCountArgs<ExtArgs>
            result: $Utils.Optional<GuildOwnerCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      OtpVerification: {
        payload: Prisma.$OtpVerificationPayload<ExtArgs>
        fields: Prisma.OtpVerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OtpVerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OtpVerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload>
          }
          findFirst: {
            args: Prisma.OtpVerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OtpVerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload>
          }
          findMany: {
            args: Prisma.OtpVerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload>[]
          }
          create: {
            args: Prisma.OtpVerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload>
          }
          createMany: {
            args: Prisma.OtpVerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OtpVerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload>[]
          }
          delete: {
            args: Prisma.OtpVerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload>
          }
          update: {
            args: Prisma.OtpVerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload>
          }
          deleteMany: {
            args: Prisma.OtpVerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OtpVerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OtpVerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload>[]
          }
          upsert: {
            args: Prisma.OtpVerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OtpVerificationPayload>
          }
          aggregate: {
            args: Prisma.OtpVerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOtpVerification>
          }
          groupBy: {
            args: Prisma.OtpVerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<OtpVerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.OtpVerificationCountArgs<ExtArgs>
            result: $Utils.Optional<OtpVerificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    playlist?: PlaylistOmit
    track?: TrackOmit
    bot?: BotOmit
    guild?: GuildOmit
    user?: UserOmit
    premiumFeature?: PremiumFeatureOmit
    guildBotSettings?: GuildBotSettingsOmit
    botInstance?: BotInstanceOmit
    payment?: PaymentOmit
    plan?: PlanOmit
    guildOwner?: GuildOwnerOmit
    admin?: AdminOmit
    otpVerification?: OtpVerificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PlaylistCountOutputType
   */

  export type PlaylistCountOutputType = {
    tracks: number
  }

  export type PlaylistCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tracks?: boolean | PlaylistCountOutputTypeCountTracksArgs
  }

  // Custom InputTypes
  /**
   * PlaylistCountOutputType without action
   */
  export type PlaylistCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlaylistCountOutputType
     */
    select?: PlaylistCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlaylistCountOutputType without action
   */
  export type PlaylistCountOutputTypeCountTracksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    playlists: number
    payments: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playlists?: boolean | UserCountOutputTypeCountPlaylistsArgs
    payments?: boolean | UserCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPlaylistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaylistWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Count Type PlanCountOutputType
   */

  export type PlanCountOutputType = {
    payments: number
  }

  export type PlanCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | PlanCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCountOutputType
     */
    select?: PlanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlanCountOutputType without action
   */
  export type PlanCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Playlist
   */

  export type AggregatePlaylist = {
    _count: PlaylistCountAggregateOutputType | null
    _min: PlaylistMinAggregateOutputType | null
    _max: PlaylistMaxAggregateOutputType | null
  }

  export type PlaylistMinAggregateOutputType = {
    playlist_id: string | null
    userId: string | null
    name: string | null
    private: boolean | null
  }

  export type PlaylistMaxAggregateOutputType = {
    playlist_id: string | null
    userId: string | null
    name: string | null
    private: boolean | null
  }

  export type PlaylistCountAggregateOutputType = {
    playlist_id: number
    userId: number
    name: number
    private: number
    _all: number
  }


  export type PlaylistMinAggregateInputType = {
    playlist_id?: true
    userId?: true
    name?: true
    private?: true
  }

  export type PlaylistMaxAggregateInputType = {
    playlist_id?: true
    userId?: true
    name?: true
    private?: true
  }

  export type PlaylistCountAggregateInputType = {
    playlist_id?: true
    userId?: true
    name?: true
    private?: true
    _all?: true
  }

  export type PlaylistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Playlist to aggregate.
     */
    where?: PlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playlists to fetch.
     */
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Playlists
    **/
    _count?: true | PlaylistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlaylistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlaylistMaxAggregateInputType
  }

  export type GetPlaylistAggregateType<T extends PlaylistAggregateArgs> = {
        [P in keyof T & keyof AggregatePlaylist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlaylist[P]>
      : GetScalarType<T[P], AggregatePlaylist[P]>
  }




  export type PlaylistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlaylistWhereInput
    orderBy?: PlaylistOrderByWithAggregationInput | PlaylistOrderByWithAggregationInput[]
    by: PlaylistScalarFieldEnum[] | PlaylistScalarFieldEnum
    having?: PlaylistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlaylistCountAggregateInputType | true
    _min?: PlaylistMinAggregateInputType
    _max?: PlaylistMaxAggregateInputType
  }

  export type PlaylistGroupByOutputType = {
    playlist_id: string
    userId: string
    name: string
    private: boolean
    _count: PlaylistCountAggregateOutputType | null
    _min: PlaylistMinAggregateOutputType | null
    _max: PlaylistMaxAggregateOutputType | null
  }

  type GetPlaylistGroupByPayload<T extends PlaylistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlaylistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlaylistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlaylistGroupByOutputType[P]>
            : GetScalarType<T[P], PlaylistGroupByOutputType[P]>
        }
      >
    >


  export type PlaylistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    playlist_id?: boolean
    userId?: boolean
    name?: boolean
    private?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    tracks?: boolean | Playlist$tracksArgs<ExtArgs>
    _count?: boolean | PlaylistCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlist"]>

  export type PlaylistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    playlist_id?: boolean
    userId?: boolean
    name?: boolean
    private?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlist"]>

  export type PlaylistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    playlist_id?: boolean
    userId?: boolean
    name?: boolean
    private?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["playlist"]>

  export type PlaylistSelectScalar = {
    playlist_id?: boolean
    userId?: boolean
    name?: boolean
    private?: boolean
  }

  export type PlaylistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"playlist_id" | "userId" | "name" | "private", ExtArgs["result"]["playlist"]>
  export type PlaylistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    tracks?: boolean | Playlist$tracksArgs<ExtArgs>
    _count?: boolean | PlaylistCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlaylistIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PlaylistIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PlaylistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Playlist"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      tracks: Prisma.$TrackPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      playlist_id: string
      userId: string
      name: string
      private: boolean
    }, ExtArgs["result"]["playlist"]>
    composites: {}
  }

  type PlaylistGetPayload<S extends boolean | null | undefined | PlaylistDefaultArgs> = $Result.GetResult<Prisma.$PlaylistPayload, S>

  type PlaylistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlaylistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: PlaylistCountAggregateInputType | true
    }

  export interface PlaylistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Playlist'], meta: { name: 'Playlist' } }
    /**
     * Find zero or one Playlist that matches the filter.
     * @param {PlaylistFindUniqueArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlaylistFindUniqueArgs>(args: SelectSubset<T, PlaylistFindUniqueArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Playlist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlaylistFindUniqueOrThrowArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlaylistFindUniqueOrThrowArgs>(args: SelectSubset<T, PlaylistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistFindFirstArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlaylistFindFirstArgs>(args?: SelectSubset<T, PlaylistFindFirstArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Playlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistFindFirstOrThrowArgs} args - Arguments to find a Playlist
     * @example
     * // Get one Playlist
     * const playlist = await prisma.playlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlaylistFindFirstOrThrowArgs>(args?: SelectSubset<T, PlaylistFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Playlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Playlists
     * const playlists = await prisma.playlist.findMany()
     * 
     * // Get first 10 Playlists
     * const playlists = await prisma.playlist.findMany({ take: 10 })
     * 
     * // Only select the `playlist_id`
     * const playlistWithPlaylist_idOnly = await prisma.playlist.findMany({ select: { playlist_id: true } })
     * 
     */
    findMany<T extends PlaylistFindManyArgs>(args?: SelectSubset<T, PlaylistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Playlist.
     * @param {PlaylistCreateArgs} args - Arguments to create a Playlist.
     * @example
     * // Create one Playlist
     * const Playlist = await prisma.playlist.create({
     *   data: {
     *     // ... data to create a Playlist
     *   }
     * })
     * 
     */
    create<T extends PlaylistCreateArgs>(args: SelectSubset<T, PlaylistCreateArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Playlists.
     * @param {PlaylistCreateManyArgs} args - Arguments to create many Playlists.
     * @example
     * // Create many Playlists
     * const playlist = await prisma.playlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlaylistCreateManyArgs>(args?: SelectSubset<T, PlaylistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Playlists and returns the data saved in the database.
     * @param {PlaylistCreateManyAndReturnArgs} args - Arguments to create many Playlists.
     * @example
     * // Create many Playlists
     * const playlist = await prisma.playlist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Playlists and only return the `playlist_id`
     * const playlistWithPlaylist_idOnly = await prisma.playlist.createManyAndReturn({
     *   select: { playlist_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlaylistCreateManyAndReturnArgs>(args?: SelectSubset<T, PlaylistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Playlist.
     * @param {PlaylistDeleteArgs} args - Arguments to delete one Playlist.
     * @example
     * // Delete one Playlist
     * const Playlist = await prisma.playlist.delete({
     *   where: {
     *     // ... filter to delete one Playlist
     *   }
     * })
     * 
     */
    delete<T extends PlaylistDeleteArgs>(args: SelectSubset<T, PlaylistDeleteArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Playlist.
     * @param {PlaylistUpdateArgs} args - Arguments to update one Playlist.
     * @example
     * // Update one Playlist
     * const playlist = await prisma.playlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlaylistUpdateArgs>(args: SelectSubset<T, PlaylistUpdateArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Playlists.
     * @param {PlaylistDeleteManyArgs} args - Arguments to filter Playlists to delete.
     * @example
     * // Delete a few Playlists
     * const { count } = await prisma.playlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlaylistDeleteManyArgs>(args?: SelectSubset<T, PlaylistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Playlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Playlists
     * const playlist = await prisma.playlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlaylistUpdateManyArgs>(args: SelectSubset<T, PlaylistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Playlists and returns the data updated in the database.
     * @param {PlaylistUpdateManyAndReturnArgs} args - Arguments to update many Playlists.
     * @example
     * // Update many Playlists
     * const playlist = await prisma.playlist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Playlists and only return the `playlist_id`
     * const playlistWithPlaylist_idOnly = await prisma.playlist.updateManyAndReturn({
     *   select: { playlist_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlaylistUpdateManyAndReturnArgs>(args: SelectSubset<T, PlaylistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Playlist.
     * @param {PlaylistUpsertArgs} args - Arguments to update or create a Playlist.
     * @example
     * // Update or create a Playlist
     * const playlist = await prisma.playlist.upsert({
     *   create: {
     *     // ... data to create a Playlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Playlist we want to update
     *   }
     * })
     */
    upsert<T extends PlaylistUpsertArgs>(args: SelectSubset<T, PlaylistUpsertArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Playlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistCountArgs} args - Arguments to filter Playlists to count.
     * @example
     * // Count the number of Playlists
     * const count = await prisma.playlist.count({
     *   where: {
     *     // ... the filter for the Playlists we want to count
     *   }
     * })
    **/
    count<T extends PlaylistCountArgs>(
      args?: Subset<T, PlaylistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlaylistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Playlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlaylistAggregateArgs>(args: Subset<T, PlaylistAggregateArgs>): Prisma.PrismaPromise<GetPlaylistAggregateType<T>>

    /**
     * Group by Playlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlaylistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlaylistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlaylistGroupByArgs['orderBy'] }
        : { orderBy?: PlaylistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlaylistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlaylistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Playlist model
   */
  readonly fields: PlaylistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Playlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlaylistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tracks<T extends Playlist$tracksArgs<ExtArgs> = {}>(args?: Subset<T, Playlist$tracksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Playlist model
   */
  interface PlaylistFieldRefs {
    readonly playlist_id: FieldRef<"Playlist", 'String'>
    readonly userId: FieldRef<"Playlist", 'String'>
    readonly name: FieldRef<"Playlist", 'String'>
    readonly private: FieldRef<"Playlist", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Playlist findUnique
   */
  export type PlaylistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlist to fetch.
     */
    where: PlaylistWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Playlist findUniqueOrThrow
   */
  export type PlaylistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlist to fetch.
     */
    where: PlaylistWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Playlist findFirst
   */
  export type PlaylistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlist to fetch.
     */
    where?: PlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playlists to fetch.
     */
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Playlists.
     */
    cursor?: PlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Playlists.
     */
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Playlist findFirstOrThrow
   */
  export type PlaylistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlist to fetch.
     */
    where?: PlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playlists to fetch.
     */
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Playlists.
     */
    cursor?: PlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Playlists.
     */
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Playlist findMany
   */
  export type PlaylistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter, which Playlists to fetch.
     */
    where?: PlaylistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Playlists to fetch.
     */
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Playlists.
     */
    cursor?: PlaylistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Playlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Playlists.
     */
    skip?: number
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Playlist create
   */
  export type PlaylistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * The data needed to create a Playlist.
     */
    data: XOR<PlaylistCreateInput, PlaylistUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Playlist createMany
   */
  export type PlaylistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Playlists.
     */
    data: PlaylistCreateManyInput | PlaylistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Playlist createManyAndReturn
   */
  export type PlaylistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * The data used to create many Playlists.
     */
    data: PlaylistCreateManyInput | PlaylistCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Playlist update
   */
  export type PlaylistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * The data needed to update a Playlist.
     */
    data: XOR<PlaylistUpdateInput, PlaylistUncheckedUpdateInput>
    /**
     * Choose, which Playlist to update.
     */
    where: PlaylistWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Playlist updateMany
   */
  export type PlaylistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Playlists.
     */
    data: XOR<PlaylistUpdateManyMutationInput, PlaylistUncheckedUpdateManyInput>
    /**
     * Filter which Playlists to update
     */
    where?: PlaylistWhereInput
    /**
     * Limit how many Playlists to update.
     */
    limit?: number
  }

  /**
   * Playlist updateManyAndReturn
   */
  export type PlaylistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * The data used to update Playlists.
     */
    data: XOR<PlaylistUpdateManyMutationInput, PlaylistUncheckedUpdateManyInput>
    /**
     * Filter which Playlists to update
     */
    where?: PlaylistWhereInput
    /**
     * Limit how many Playlists to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Playlist upsert
   */
  export type PlaylistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * The filter to search for the Playlist to update in case it exists.
     */
    where: PlaylistWhereUniqueInput
    /**
     * In case the Playlist found by the `where` argument doesn't exist, create a new Playlist with this data.
     */
    create: XOR<PlaylistCreateInput, PlaylistUncheckedCreateInput>
    /**
     * In case the Playlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlaylistUpdateInput, PlaylistUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Playlist delete
   */
  export type PlaylistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    /**
     * Filter which Playlist to delete.
     */
    where: PlaylistWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Playlist deleteMany
   */
  export type PlaylistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Playlists to delete
     */
    where?: PlaylistWhereInput
    /**
     * Limit how many Playlists to delete.
     */
    limit?: number
  }

  /**
   * Playlist.tracks
   */
  export type Playlist$tracksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    where?: TrackWhereInput
    orderBy?: TrackOrderByWithRelationInput | TrackOrderByWithRelationInput[]
    cursor?: TrackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TrackScalarFieldEnum | TrackScalarFieldEnum[]
  }

  /**
   * Playlist without action
   */
  export type PlaylistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
  }


  /**
   * Model Track
   */

  export type AggregateTrack = {
    _count: TrackCountAggregateOutputType | null
    _avg: TrackAvgAggregateOutputType | null
    _sum: TrackSumAggregateOutputType | null
    _min: TrackMinAggregateOutputType | null
    _max: TrackMaxAggregateOutputType | null
  }

  export type TrackAvgAggregateOutputType = {
    duration: number | null
  }

  export type TrackSumAggregateOutputType = {
    duration: number | null
  }

  export type TrackMinAggregateOutputType = {
    track_id: string | null
    uri: string | null
    name: string | null
    encode: string | null
    duration: number | null
    playlist_id: string | null
  }

  export type TrackMaxAggregateOutputType = {
    track_id: string | null
    uri: string | null
    name: string | null
    encode: string | null
    duration: number | null
    playlist_id: string | null
  }

  export type TrackCountAggregateOutputType = {
    track_id: number
    uri: number
    name: number
    encode: number
    duration: number
    playlist_id: number
    _all: number
  }


  export type TrackAvgAggregateInputType = {
    duration?: true
  }

  export type TrackSumAggregateInputType = {
    duration?: true
  }

  export type TrackMinAggregateInputType = {
    track_id?: true
    uri?: true
    name?: true
    encode?: true
    duration?: true
    playlist_id?: true
  }

  export type TrackMaxAggregateInputType = {
    track_id?: true
    uri?: true
    name?: true
    encode?: true
    duration?: true
    playlist_id?: true
  }

  export type TrackCountAggregateInputType = {
    track_id?: true
    uri?: true
    name?: true
    encode?: true
    duration?: true
    playlist_id?: true
    _all?: true
  }

  export type TrackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Track to aggregate.
     */
    where?: TrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tracks to fetch.
     */
    orderBy?: TrackOrderByWithRelationInput | TrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tracks
    **/
    _count?: true | TrackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TrackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TrackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TrackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TrackMaxAggregateInputType
  }

  export type GetTrackAggregateType<T extends TrackAggregateArgs> = {
        [P in keyof T & keyof AggregateTrack]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTrack[P]>
      : GetScalarType<T[P], AggregateTrack[P]>
  }




  export type TrackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TrackWhereInput
    orderBy?: TrackOrderByWithAggregationInput | TrackOrderByWithAggregationInput[]
    by: TrackScalarFieldEnum[] | TrackScalarFieldEnum
    having?: TrackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TrackCountAggregateInputType | true
    _avg?: TrackAvgAggregateInputType
    _sum?: TrackSumAggregateInputType
    _min?: TrackMinAggregateInputType
    _max?: TrackMaxAggregateInputType
  }

  export type TrackGroupByOutputType = {
    track_id: string
    uri: string
    name: string
    encode: string
    duration: number
    playlist_id: string
    _count: TrackCountAggregateOutputType | null
    _avg: TrackAvgAggregateOutputType | null
    _sum: TrackSumAggregateOutputType | null
    _min: TrackMinAggregateOutputType | null
    _max: TrackMaxAggregateOutputType | null
  }

  type GetTrackGroupByPayload<T extends TrackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TrackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TrackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TrackGroupByOutputType[P]>
            : GetScalarType<T[P], TrackGroupByOutputType[P]>
        }
      >
    >


  export type TrackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    track_id?: boolean
    uri?: boolean
    name?: boolean
    encode?: boolean
    duration?: boolean
    playlist_id?: boolean
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["track"]>

  export type TrackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    track_id?: boolean
    uri?: boolean
    name?: boolean
    encode?: boolean
    duration?: boolean
    playlist_id?: boolean
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["track"]>

  export type TrackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    track_id?: boolean
    uri?: boolean
    name?: boolean
    encode?: boolean
    duration?: boolean
    playlist_id?: boolean
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["track"]>

  export type TrackSelectScalar = {
    track_id?: boolean
    uri?: boolean
    name?: boolean
    encode?: boolean
    duration?: boolean
    playlist_id?: boolean
  }

  export type TrackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"track_id" | "uri" | "name" | "encode" | "duration" | "playlist_id", ExtArgs["result"]["track"]>
  export type TrackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
  }
  export type TrackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
  }
  export type TrackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playlist?: boolean | PlaylistDefaultArgs<ExtArgs>
  }

  export type $TrackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Track"
    objects: {
      playlist: Prisma.$PlaylistPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      track_id: string
      uri: string
      name: string
      encode: string
      duration: number
      playlist_id: string
    }, ExtArgs["result"]["track"]>
    composites: {}
  }

  type TrackGetPayload<S extends boolean | null | undefined | TrackDefaultArgs> = $Result.GetResult<Prisma.$TrackPayload, S>

  type TrackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TrackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: TrackCountAggregateInputType | true
    }

  export interface TrackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Track'], meta: { name: 'Track' } }
    /**
     * Find zero or one Track that matches the filter.
     * @param {TrackFindUniqueArgs} args - Arguments to find a Track
     * @example
     * // Get one Track
     * const track = await prisma.track.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TrackFindUniqueArgs>(args: SelectSubset<T, TrackFindUniqueArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Track that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TrackFindUniqueOrThrowArgs} args - Arguments to find a Track
     * @example
     * // Get one Track
     * const track = await prisma.track.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TrackFindUniqueOrThrowArgs>(args: SelectSubset<T, TrackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Track that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackFindFirstArgs} args - Arguments to find a Track
     * @example
     * // Get one Track
     * const track = await prisma.track.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TrackFindFirstArgs>(args?: SelectSubset<T, TrackFindFirstArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Track that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackFindFirstOrThrowArgs} args - Arguments to find a Track
     * @example
     * // Get one Track
     * const track = await prisma.track.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TrackFindFirstOrThrowArgs>(args?: SelectSubset<T, TrackFindFirstOrThrowArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tracks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tracks
     * const tracks = await prisma.track.findMany()
     * 
     * // Get first 10 Tracks
     * const tracks = await prisma.track.findMany({ take: 10 })
     * 
     * // Only select the `track_id`
     * const trackWithTrack_idOnly = await prisma.track.findMany({ select: { track_id: true } })
     * 
     */
    findMany<T extends TrackFindManyArgs>(args?: SelectSubset<T, TrackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Track.
     * @param {TrackCreateArgs} args - Arguments to create a Track.
     * @example
     * // Create one Track
     * const Track = await prisma.track.create({
     *   data: {
     *     // ... data to create a Track
     *   }
     * })
     * 
     */
    create<T extends TrackCreateArgs>(args: SelectSubset<T, TrackCreateArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tracks.
     * @param {TrackCreateManyArgs} args - Arguments to create many Tracks.
     * @example
     * // Create many Tracks
     * const track = await prisma.track.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TrackCreateManyArgs>(args?: SelectSubset<T, TrackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tracks and returns the data saved in the database.
     * @param {TrackCreateManyAndReturnArgs} args - Arguments to create many Tracks.
     * @example
     * // Create many Tracks
     * const track = await prisma.track.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tracks and only return the `track_id`
     * const trackWithTrack_idOnly = await prisma.track.createManyAndReturn({
     *   select: { track_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TrackCreateManyAndReturnArgs>(args?: SelectSubset<T, TrackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Track.
     * @param {TrackDeleteArgs} args - Arguments to delete one Track.
     * @example
     * // Delete one Track
     * const Track = await prisma.track.delete({
     *   where: {
     *     // ... filter to delete one Track
     *   }
     * })
     * 
     */
    delete<T extends TrackDeleteArgs>(args: SelectSubset<T, TrackDeleteArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Track.
     * @param {TrackUpdateArgs} args - Arguments to update one Track.
     * @example
     * // Update one Track
     * const track = await prisma.track.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TrackUpdateArgs>(args: SelectSubset<T, TrackUpdateArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tracks.
     * @param {TrackDeleteManyArgs} args - Arguments to filter Tracks to delete.
     * @example
     * // Delete a few Tracks
     * const { count } = await prisma.track.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TrackDeleteManyArgs>(args?: SelectSubset<T, TrackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tracks
     * const track = await prisma.track.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TrackUpdateManyArgs>(args: SelectSubset<T, TrackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tracks and returns the data updated in the database.
     * @param {TrackUpdateManyAndReturnArgs} args - Arguments to update many Tracks.
     * @example
     * // Update many Tracks
     * const track = await prisma.track.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tracks and only return the `track_id`
     * const trackWithTrack_idOnly = await prisma.track.updateManyAndReturn({
     *   select: { track_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TrackUpdateManyAndReturnArgs>(args: SelectSubset<T, TrackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Track.
     * @param {TrackUpsertArgs} args - Arguments to update or create a Track.
     * @example
     * // Update or create a Track
     * const track = await prisma.track.upsert({
     *   create: {
     *     // ... data to create a Track
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Track we want to update
     *   }
     * })
     */
    upsert<T extends TrackUpsertArgs>(args: SelectSubset<T, TrackUpsertArgs<ExtArgs>>): Prisma__TrackClient<$Result.GetResult<Prisma.$TrackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tracks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackCountArgs} args - Arguments to filter Tracks to count.
     * @example
     * // Count the number of Tracks
     * const count = await prisma.track.count({
     *   where: {
     *     // ... the filter for the Tracks we want to count
     *   }
     * })
    **/
    count<T extends TrackCountArgs>(
      args?: Subset<T, TrackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TrackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Track.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TrackAggregateArgs>(args: Subset<T, TrackAggregateArgs>): Prisma.PrismaPromise<GetTrackAggregateType<T>>

    /**
     * Group by Track.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TrackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TrackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TrackGroupByArgs['orderBy'] }
        : { orderBy?: TrackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TrackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTrackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Track model
   */
  readonly fields: TrackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Track.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TrackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    playlist<T extends PlaylistDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlaylistDefaultArgs<ExtArgs>>): Prisma__PlaylistClient<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Track model
   */
  interface TrackFieldRefs {
    readonly track_id: FieldRef<"Track", 'String'>
    readonly uri: FieldRef<"Track", 'String'>
    readonly name: FieldRef<"Track", 'String'>
    readonly encode: FieldRef<"Track", 'String'>
    readonly duration: FieldRef<"Track", 'Int'>
    readonly playlist_id: FieldRef<"Track", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Track findUnique
   */
  export type TrackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * Filter, which Track to fetch.
     */
    where: TrackWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Track findUniqueOrThrow
   */
  export type TrackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * Filter, which Track to fetch.
     */
    where: TrackWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Track findFirst
   */
  export type TrackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * Filter, which Track to fetch.
     */
    where?: TrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tracks to fetch.
     */
    orderBy?: TrackOrderByWithRelationInput | TrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tracks.
     */
    cursor?: TrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tracks.
     */
    distinct?: TrackScalarFieldEnum | TrackScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Track findFirstOrThrow
   */
  export type TrackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * Filter, which Track to fetch.
     */
    where?: TrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tracks to fetch.
     */
    orderBy?: TrackOrderByWithRelationInput | TrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tracks.
     */
    cursor?: TrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tracks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tracks.
     */
    distinct?: TrackScalarFieldEnum | TrackScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Track findMany
   */
  export type TrackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * Filter, which Tracks to fetch.
     */
    where?: TrackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tracks to fetch.
     */
    orderBy?: TrackOrderByWithRelationInput | TrackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tracks.
     */
    cursor?: TrackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tracks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tracks.
     */
    skip?: number
    distinct?: TrackScalarFieldEnum | TrackScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Track create
   */
  export type TrackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * The data needed to create a Track.
     */
    data: XOR<TrackCreateInput, TrackUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Track createMany
   */
  export type TrackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tracks.
     */
    data: TrackCreateManyInput | TrackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Track createManyAndReturn
   */
  export type TrackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * The data used to create many Tracks.
     */
    data: TrackCreateManyInput | TrackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Track update
   */
  export type TrackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * The data needed to update a Track.
     */
    data: XOR<TrackUpdateInput, TrackUncheckedUpdateInput>
    /**
     * Choose, which Track to update.
     */
    where: TrackWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Track updateMany
   */
  export type TrackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tracks.
     */
    data: XOR<TrackUpdateManyMutationInput, TrackUncheckedUpdateManyInput>
    /**
     * Filter which Tracks to update
     */
    where?: TrackWhereInput
    /**
     * Limit how many Tracks to update.
     */
    limit?: number
  }

  /**
   * Track updateManyAndReturn
   */
  export type TrackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * The data used to update Tracks.
     */
    data: XOR<TrackUpdateManyMutationInput, TrackUncheckedUpdateManyInput>
    /**
     * Filter which Tracks to update
     */
    where?: TrackWhereInput
    /**
     * Limit how many Tracks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Track upsert
   */
  export type TrackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * The filter to search for the Track to update in case it exists.
     */
    where: TrackWhereUniqueInput
    /**
     * In case the Track found by the `where` argument doesn't exist, create a new Track with this data.
     */
    create: XOR<TrackCreateInput, TrackUncheckedCreateInput>
    /**
     * In case the Track was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TrackUpdateInput, TrackUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Track delete
   */
  export type TrackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
    /**
     * Filter which Track to delete.
     */
    where: TrackWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Track deleteMany
   */
  export type TrackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tracks to delete
     */
    where?: TrackWhereInput
    /**
     * Limit how many Tracks to delete.
     */
    limit?: number
  }

  /**
   * Track without action
   */
  export type TrackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Track
     */
    select?: TrackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Track
     */
    omit?: TrackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TrackInclude<ExtArgs> | null
  }


  /**
   * Model Bot
   */

  export type AggregateBot = {
    _count: BotCountAggregateOutputType | null
    _min: BotMinAggregateOutputType | null
    _max: BotMaxAggregateOutputType | null
  }

  export type BotMinAggregateOutputType = {
    botId: string | null
    voiceId: string | null
  }

  export type BotMaxAggregateOutputType = {
    botId: string | null
    voiceId: string | null
  }

  export type BotCountAggregateOutputType = {
    botId: number
    voiceId: number
    _all: number
  }


  export type BotMinAggregateInputType = {
    botId?: true
    voiceId?: true
  }

  export type BotMaxAggregateInputType = {
    botId?: true
    voiceId?: true
  }

  export type BotCountAggregateInputType = {
    botId?: true
    voiceId?: true
    _all?: true
  }

  export type BotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bot to aggregate.
     */
    where?: BotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bots to fetch.
     */
    orderBy?: BotOrderByWithRelationInput | BotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Bots
    **/
    _count?: true | BotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BotMaxAggregateInputType
  }

  export type GetBotAggregateType<T extends BotAggregateArgs> = {
        [P in keyof T & keyof AggregateBot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBot[P]>
      : GetScalarType<T[P], AggregateBot[P]>
  }




  export type BotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BotWhereInput
    orderBy?: BotOrderByWithAggregationInput | BotOrderByWithAggregationInput[]
    by: BotScalarFieldEnum[] | BotScalarFieldEnum
    having?: BotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BotCountAggregateInputType | true
    _min?: BotMinAggregateInputType
    _max?: BotMaxAggregateInputType
  }

  export type BotGroupByOutputType = {
    botId: string
    voiceId: string | null
    _count: BotCountAggregateOutputType | null
    _min: BotMinAggregateOutputType | null
    _max: BotMaxAggregateOutputType | null
  }

  type GetBotGroupByPayload<T extends BotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BotGroupByOutputType[P]>
            : GetScalarType<T[P], BotGroupByOutputType[P]>
        }
      >
    >


  export type BotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    botId?: boolean
    voiceId?: boolean
  }, ExtArgs["result"]["bot"]>

  export type BotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    botId?: boolean
    voiceId?: boolean
  }, ExtArgs["result"]["bot"]>

  export type BotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    botId?: boolean
    voiceId?: boolean
  }, ExtArgs["result"]["bot"]>

  export type BotSelectScalar = {
    botId?: boolean
    voiceId?: boolean
  }

  export type BotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"botId" | "voiceId", ExtArgs["result"]["bot"]>

  export type $BotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Bot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      botId: string
      voiceId: string | null
    }, ExtArgs["result"]["bot"]>
    composites: {}
  }

  type BotGetPayload<S extends boolean | null | undefined | BotDefaultArgs> = $Result.GetResult<Prisma.$BotPayload, S>

  type BotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: BotCountAggregateInputType | true
    }

  export interface BotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Bot'], meta: { name: 'Bot' } }
    /**
     * Find zero or one Bot that matches the filter.
     * @param {BotFindUniqueArgs} args - Arguments to find a Bot
     * @example
     * // Get one Bot
     * const bot = await prisma.bot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BotFindUniqueArgs>(args: SelectSubset<T, BotFindUniqueArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BotFindUniqueOrThrowArgs} args - Arguments to find a Bot
     * @example
     * // Get one Bot
     * const bot = await prisma.bot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BotFindUniqueOrThrowArgs>(args: SelectSubset<T, BotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotFindFirstArgs} args - Arguments to find a Bot
     * @example
     * // Get one Bot
     * const bot = await prisma.bot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BotFindFirstArgs>(args?: SelectSubset<T, BotFindFirstArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotFindFirstOrThrowArgs} args - Arguments to find a Bot
     * @example
     * // Get one Bot
     * const bot = await prisma.bot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BotFindFirstOrThrowArgs>(args?: SelectSubset<T, BotFindFirstOrThrowArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bots
     * const bots = await prisma.bot.findMany()
     * 
     * // Get first 10 Bots
     * const bots = await prisma.bot.findMany({ take: 10 })
     * 
     * // Only select the `botId`
     * const botWithBotIdOnly = await prisma.bot.findMany({ select: { botId: true } })
     * 
     */
    findMany<T extends BotFindManyArgs>(args?: SelectSubset<T, BotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bot.
     * @param {BotCreateArgs} args - Arguments to create a Bot.
     * @example
     * // Create one Bot
     * const Bot = await prisma.bot.create({
     *   data: {
     *     // ... data to create a Bot
     *   }
     * })
     * 
     */
    create<T extends BotCreateArgs>(args: SelectSubset<T, BotCreateArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bots.
     * @param {BotCreateManyArgs} args - Arguments to create many Bots.
     * @example
     * // Create many Bots
     * const bot = await prisma.bot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BotCreateManyArgs>(args?: SelectSubset<T, BotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bots and returns the data saved in the database.
     * @param {BotCreateManyAndReturnArgs} args - Arguments to create many Bots.
     * @example
     * // Create many Bots
     * const bot = await prisma.bot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bots and only return the `botId`
     * const botWithBotIdOnly = await prisma.bot.createManyAndReturn({
     *   select: { botId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BotCreateManyAndReturnArgs>(args?: SelectSubset<T, BotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bot.
     * @param {BotDeleteArgs} args - Arguments to delete one Bot.
     * @example
     * // Delete one Bot
     * const Bot = await prisma.bot.delete({
     *   where: {
     *     // ... filter to delete one Bot
     *   }
     * })
     * 
     */
    delete<T extends BotDeleteArgs>(args: SelectSubset<T, BotDeleteArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bot.
     * @param {BotUpdateArgs} args - Arguments to update one Bot.
     * @example
     * // Update one Bot
     * const bot = await prisma.bot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BotUpdateArgs>(args: SelectSubset<T, BotUpdateArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bots.
     * @param {BotDeleteManyArgs} args - Arguments to filter Bots to delete.
     * @example
     * // Delete a few Bots
     * const { count } = await prisma.bot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BotDeleteManyArgs>(args?: SelectSubset<T, BotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bots
     * const bot = await prisma.bot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BotUpdateManyArgs>(args: SelectSubset<T, BotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bots and returns the data updated in the database.
     * @param {BotUpdateManyAndReturnArgs} args - Arguments to update many Bots.
     * @example
     * // Update many Bots
     * const bot = await prisma.bot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bots and only return the `botId`
     * const botWithBotIdOnly = await prisma.bot.updateManyAndReturn({
     *   select: { botId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BotUpdateManyAndReturnArgs>(args: SelectSubset<T, BotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bot.
     * @param {BotUpsertArgs} args - Arguments to update or create a Bot.
     * @example
     * // Update or create a Bot
     * const bot = await prisma.bot.upsert({
     *   create: {
     *     // ... data to create a Bot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bot we want to update
     *   }
     * })
     */
    upsert<T extends BotUpsertArgs>(args: SelectSubset<T, BotUpsertArgs<ExtArgs>>): Prisma__BotClient<$Result.GetResult<Prisma.$BotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotCountArgs} args - Arguments to filter Bots to count.
     * @example
     * // Count the number of Bots
     * const count = await prisma.bot.count({
     *   where: {
     *     // ... the filter for the Bots we want to count
     *   }
     * })
    **/
    count<T extends BotCountArgs>(
      args?: Subset<T, BotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BotAggregateArgs>(args: Subset<T, BotAggregateArgs>): Prisma.PrismaPromise<GetBotAggregateType<T>>

    /**
     * Group by Bot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BotGroupByArgs['orderBy'] }
        : { orderBy?: BotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Bot model
   */
  readonly fields: BotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Bot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Bot model
   */
  interface BotFieldRefs {
    readonly botId: FieldRef<"Bot", 'String'>
    readonly voiceId: FieldRef<"Bot", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Bot findUnique
   */
  export type BotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Filter, which Bot to fetch.
     */
    where: BotWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Bot findUniqueOrThrow
   */
  export type BotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Filter, which Bot to fetch.
     */
    where: BotWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Bot findFirst
   */
  export type BotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Filter, which Bot to fetch.
     */
    where?: BotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bots to fetch.
     */
    orderBy?: BotOrderByWithRelationInput | BotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bots.
     */
    cursor?: BotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bots.
     */
    distinct?: BotScalarFieldEnum | BotScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Bot findFirstOrThrow
   */
  export type BotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Filter, which Bot to fetch.
     */
    where?: BotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bots to fetch.
     */
    orderBy?: BotOrderByWithRelationInput | BotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Bots.
     */
    cursor?: BotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Bots.
     */
    distinct?: BotScalarFieldEnum | BotScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Bot findMany
   */
  export type BotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Filter, which Bots to fetch.
     */
    where?: BotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Bots to fetch.
     */
    orderBy?: BotOrderByWithRelationInput | BotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Bots.
     */
    cursor?: BotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Bots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Bots.
     */
    skip?: number
    distinct?: BotScalarFieldEnum | BotScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Bot create
   */
  export type BotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * The data needed to create a Bot.
     */
    data: XOR<BotCreateInput, BotUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Bot createMany
   */
  export type BotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bots.
     */
    data: BotCreateManyInput | BotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bot createManyAndReturn
   */
  export type BotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * The data used to create many Bots.
     */
    data: BotCreateManyInput | BotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Bot update
   */
  export type BotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * The data needed to update a Bot.
     */
    data: XOR<BotUpdateInput, BotUncheckedUpdateInput>
    /**
     * Choose, which Bot to update.
     */
    where: BotWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Bot updateMany
   */
  export type BotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Bots.
     */
    data: XOR<BotUpdateManyMutationInput, BotUncheckedUpdateManyInput>
    /**
     * Filter which Bots to update
     */
    where?: BotWhereInput
    /**
     * Limit how many Bots to update.
     */
    limit?: number
  }

  /**
   * Bot updateManyAndReturn
   */
  export type BotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * The data used to update Bots.
     */
    data: XOR<BotUpdateManyMutationInput, BotUncheckedUpdateManyInput>
    /**
     * Filter which Bots to update
     */
    where?: BotWhereInput
    /**
     * Limit how many Bots to update.
     */
    limit?: number
  }

  /**
   * Bot upsert
   */
  export type BotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * The filter to search for the Bot to update in case it exists.
     */
    where: BotWhereUniqueInput
    /**
     * In case the Bot found by the `where` argument doesn't exist, create a new Bot with this data.
     */
    create: XOR<BotCreateInput, BotUncheckedCreateInput>
    /**
     * In case the Bot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BotUpdateInput, BotUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Bot delete
   */
  export type BotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
    /**
     * Filter which Bot to delete.
     */
    where: BotWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Bot deleteMany
   */
  export type BotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Bots to delete
     */
    where?: BotWhereInput
    /**
     * Limit how many Bots to delete.
     */
    limit?: number
  }

  /**
   * Bot without action
   */
  export type BotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bot
     */
    select?: BotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Bot
     */
    omit?: BotOmit<ExtArgs> | null
  }


  /**
   * Model Guild
   */

  export type AggregateGuild = {
    _count: GuildCountAggregateOutputType | null
    _avg: GuildAvgAggregateOutputType | null
    _sum: GuildSumAggregateOutputType | null
    _min: GuildMinAggregateOutputType | null
    _max: GuildMaxAggregateOutputType | null
  }

  export type GuildAvgAggregateOutputType = {
    defaultVolume: number | null
    totalCommands: number | null
    premiumSlots: number | null
  }

  export type GuildSumAggregateOutputType = {
    defaultVolume: number | null
    totalCommands: number | null
    premiumSlots: number | null
  }

  export type GuildMinAggregateOutputType = {
    guildId: string | null
    premiumFrom: Date | null
    premiumTo: Date | null
    premiumPlan: $Enums.PremiumPlan | null
    language: string | null
    customBotName: string | null
    embedColor: string | null
    defaultVolume: number | null
    enable247: boolean | null
    enableAutoplay: boolean | null
    enableVoteSkip: boolean | null
    isActive: boolean | null
    lastActivity: Date | null
    totalCommands: number | null
    premiumSlots: number | null
  }

  export type GuildMaxAggregateOutputType = {
    guildId: string | null
    premiumFrom: Date | null
    premiumTo: Date | null
    premiumPlan: $Enums.PremiumPlan | null
    language: string | null
    customBotName: string | null
    embedColor: string | null
    defaultVolume: number | null
    enable247: boolean | null
    enableAutoplay: boolean | null
    enableVoteSkip: boolean | null
    isActive: boolean | null
    lastActivity: Date | null
    totalCommands: number | null
    premiumSlots: number | null
  }

  export type GuildCountAggregateOutputType = {
    guildId: number
    premiumFrom: number
    premiumTo: number
    premiumPlan: number
    language: number
    customBotName: number
    embedColor: number
    defaultVolume: number
    enable247: number
    enableAutoplay: number
    enableVoteSkip: number
    isActive: number
    lastActivity: number
    totalCommands: number
    premiumSlots: number
    _all: number
  }


  export type GuildAvgAggregateInputType = {
    defaultVolume?: true
    totalCommands?: true
    premiumSlots?: true
  }

  export type GuildSumAggregateInputType = {
    defaultVolume?: true
    totalCommands?: true
    premiumSlots?: true
  }

  export type GuildMinAggregateInputType = {
    guildId?: true
    premiumFrom?: true
    premiumTo?: true
    premiumPlan?: true
    language?: true
    customBotName?: true
    embedColor?: true
    defaultVolume?: true
    enable247?: true
    enableAutoplay?: true
    enableVoteSkip?: true
    isActive?: true
    lastActivity?: true
    totalCommands?: true
    premiumSlots?: true
  }

  export type GuildMaxAggregateInputType = {
    guildId?: true
    premiumFrom?: true
    premiumTo?: true
    premiumPlan?: true
    language?: true
    customBotName?: true
    embedColor?: true
    defaultVolume?: true
    enable247?: true
    enableAutoplay?: true
    enableVoteSkip?: true
    isActive?: true
    lastActivity?: true
    totalCommands?: true
    premiumSlots?: true
  }

  export type GuildCountAggregateInputType = {
    guildId?: true
    premiumFrom?: true
    premiumTo?: true
    premiumPlan?: true
    language?: true
    customBotName?: true
    embedColor?: true
    defaultVolume?: true
    enable247?: true
    enableAutoplay?: true
    enableVoteSkip?: true
    isActive?: true
    lastActivity?: true
    totalCommands?: true
    premiumSlots?: true
    _all?: true
  }

  export type GuildAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Guild to aggregate.
     */
    where?: GuildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guilds to fetch.
     */
    orderBy?: GuildOrderByWithRelationInput | GuildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guilds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guilds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Guilds
    **/
    _count?: true | GuildCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GuildAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GuildSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuildMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuildMaxAggregateInputType
  }

  export type GetGuildAggregateType<T extends GuildAggregateArgs> = {
        [P in keyof T & keyof AggregateGuild]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuild[P]>
      : GetScalarType<T[P], AggregateGuild[P]>
  }




  export type GuildGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuildWhereInput
    orderBy?: GuildOrderByWithAggregationInput | GuildOrderByWithAggregationInput[]
    by: GuildScalarFieldEnum[] | GuildScalarFieldEnum
    having?: GuildScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuildCountAggregateInputType | true
    _avg?: GuildAvgAggregateInputType
    _sum?: GuildSumAggregateInputType
    _min?: GuildMinAggregateInputType
    _max?: GuildMaxAggregateInputType
  }

  export type GuildGroupByOutputType = {
    guildId: string
    premiumFrom: Date | null
    premiumTo: Date | null
    premiumPlan: $Enums.PremiumPlan
    language: string
    customBotName: string | null
    embedColor: string | null
    defaultVolume: number | null
    enable247: boolean
    enableAutoplay: boolean
    enableVoteSkip: boolean
    isActive: boolean
    lastActivity: Date
    totalCommands: number
    premiumSlots: number
    _count: GuildCountAggregateOutputType | null
    _avg: GuildAvgAggregateOutputType | null
    _sum: GuildSumAggregateOutputType | null
    _min: GuildMinAggregateOutputType | null
    _max: GuildMaxAggregateOutputType | null
  }

  type GetGuildGroupByPayload<T extends GuildGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuildGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuildGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuildGroupByOutputType[P]>
            : GetScalarType<T[P], GuildGroupByOutputType[P]>
        }
      >
    >


  export type GuildSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    guildId?: boolean
    premiumFrom?: boolean
    premiumTo?: boolean
    premiumPlan?: boolean
    language?: boolean
    customBotName?: boolean
    embedColor?: boolean
    defaultVolume?: boolean
    enable247?: boolean
    enableAutoplay?: boolean
    enableVoteSkip?: boolean
    isActive?: boolean
    lastActivity?: boolean
    totalCommands?: boolean
    premiumSlots?: boolean
    guildBotSettings?: boolean | Guild$guildBotSettingsArgs<ExtArgs>
  }, ExtArgs["result"]["guild"]>

  export type GuildSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    guildId?: boolean
    premiumFrom?: boolean
    premiumTo?: boolean
    premiumPlan?: boolean
    language?: boolean
    customBotName?: boolean
    embedColor?: boolean
    defaultVolume?: boolean
    enable247?: boolean
    enableAutoplay?: boolean
    enableVoteSkip?: boolean
    isActive?: boolean
    lastActivity?: boolean
    totalCommands?: boolean
    premiumSlots?: boolean
  }, ExtArgs["result"]["guild"]>

  export type GuildSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    guildId?: boolean
    premiumFrom?: boolean
    premiumTo?: boolean
    premiumPlan?: boolean
    language?: boolean
    customBotName?: boolean
    embedColor?: boolean
    defaultVolume?: boolean
    enable247?: boolean
    enableAutoplay?: boolean
    enableVoteSkip?: boolean
    isActive?: boolean
    lastActivity?: boolean
    totalCommands?: boolean
    premiumSlots?: boolean
  }, ExtArgs["result"]["guild"]>

  export type GuildSelectScalar = {
    guildId?: boolean
    premiumFrom?: boolean
    premiumTo?: boolean
    premiumPlan?: boolean
    language?: boolean
    customBotName?: boolean
    embedColor?: boolean
    defaultVolume?: boolean
    enable247?: boolean
    enableAutoplay?: boolean
    enableVoteSkip?: boolean
    isActive?: boolean
    lastActivity?: boolean
    totalCommands?: boolean
    premiumSlots?: boolean
  }

  export type GuildOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"guildId" | "premiumFrom" | "premiumTo" | "premiumPlan" | "language" | "customBotName" | "embedColor" | "defaultVolume" | "enable247" | "enableAutoplay" | "enableVoteSkip" | "isActive" | "lastActivity" | "totalCommands" | "premiumSlots", ExtArgs["result"]["guild"]>
  export type GuildInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guildBotSettings?: boolean | Guild$guildBotSettingsArgs<ExtArgs>
  }
  export type GuildIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GuildIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GuildPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Guild"
    objects: {
      guildBotSettings: Prisma.$GuildBotSettingsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      guildId: string
      premiumFrom: Date | null
      premiumTo: Date | null
      premiumPlan: $Enums.PremiumPlan
      language: string
      customBotName: string | null
      embedColor: string | null
      defaultVolume: number | null
      enable247: boolean
      enableAutoplay: boolean
      enableVoteSkip: boolean
      isActive: boolean
      lastActivity: Date
      totalCommands: number
      premiumSlots: number
    }, ExtArgs["result"]["guild"]>
    composites: {}
  }

  type GuildGetPayload<S extends boolean | null | undefined | GuildDefaultArgs> = $Result.GetResult<Prisma.$GuildPayload, S>

  type GuildCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GuildFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: GuildCountAggregateInputType | true
    }

  export interface GuildDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Guild'], meta: { name: 'Guild' } }
    /**
     * Find zero or one Guild that matches the filter.
     * @param {GuildFindUniqueArgs} args - Arguments to find a Guild
     * @example
     * // Get one Guild
     * const guild = await prisma.guild.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuildFindUniqueArgs>(args: SelectSubset<T, GuildFindUniqueArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Guild that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GuildFindUniqueOrThrowArgs} args - Arguments to find a Guild
     * @example
     * // Get one Guild
     * const guild = await prisma.guild.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuildFindUniqueOrThrowArgs>(args: SelectSubset<T, GuildFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guild that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildFindFirstArgs} args - Arguments to find a Guild
     * @example
     * // Get one Guild
     * const guild = await prisma.guild.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuildFindFirstArgs>(args?: SelectSubset<T, GuildFindFirstArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Guild that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildFindFirstOrThrowArgs} args - Arguments to find a Guild
     * @example
     * // Get one Guild
     * const guild = await prisma.guild.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuildFindFirstOrThrowArgs>(args?: SelectSubset<T, GuildFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Guilds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Guilds
     * const guilds = await prisma.guild.findMany()
     * 
     * // Get first 10 Guilds
     * const guilds = await prisma.guild.findMany({ take: 10 })
     * 
     * // Only select the `guildId`
     * const guildWithGuildIdOnly = await prisma.guild.findMany({ select: { guildId: true } })
     * 
     */
    findMany<T extends GuildFindManyArgs>(args?: SelectSubset<T, GuildFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Guild.
     * @param {GuildCreateArgs} args - Arguments to create a Guild.
     * @example
     * // Create one Guild
     * const Guild = await prisma.guild.create({
     *   data: {
     *     // ... data to create a Guild
     *   }
     * })
     * 
     */
    create<T extends GuildCreateArgs>(args: SelectSubset<T, GuildCreateArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Guilds.
     * @param {GuildCreateManyArgs} args - Arguments to create many Guilds.
     * @example
     * // Create many Guilds
     * const guild = await prisma.guild.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuildCreateManyArgs>(args?: SelectSubset<T, GuildCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Guilds and returns the data saved in the database.
     * @param {GuildCreateManyAndReturnArgs} args - Arguments to create many Guilds.
     * @example
     * // Create many Guilds
     * const guild = await prisma.guild.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Guilds and only return the `guildId`
     * const guildWithGuildIdOnly = await prisma.guild.createManyAndReturn({
     *   select: { guildId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GuildCreateManyAndReturnArgs>(args?: SelectSubset<T, GuildCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Guild.
     * @param {GuildDeleteArgs} args - Arguments to delete one Guild.
     * @example
     * // Delete one Guild
     * const Guild = await prisma.guild.delete({
     *   where: {
     *     // ... filter to delete one Guild
     *   }
     * })
     * 
     */
    delete<T extends GuildDeleteArgs>(args: SelectSubset<T, GuildDeleteArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Guild.
     * @param {GuildUpdateArgs} args - Arguments to update one Guild.
     * @example
     * // Update one Guild
     * const guild = await prisma.guild.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuildUpdateArgs>(args: SelectSubset<T, GuildUpdateArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Guilds.
     * @param {GuildDeleteManyArgs} args - Arguments to filter Guilds to delete.
     * @example
     * // Delete a few Guilds
     * const { count } = await prisma.guild.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuildDeleteManyArgs>(args?: SelectSubset<T, GuildDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guilds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Guilds
     * const guild = await prisma.guild.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuildUpdateManyArgs>(args: SelectSubset<T, GuildUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Guilds and returns the data updated in the database.
     * @param {GuildUpdateManyAndReturnArgs} args - Arguments to update many Guilds.
     * @example
     * // Update many Guilds
     * const guild = await prisma.guild.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Guilds and only return the `guildId`
     * const guildWithGuildIdOnly = await prisma.guild.updateManyAndReturn({
     *   select: { guildId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GuildUpdateManyAndReturnArgs>(args: SelectSubset<T, GuildUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Guild.
     * @param {GuildUpsertArgs} args - Arguments to update or create a Guild.
     * @example
     * // Update or create a Guild
     * const guild = await prisma.guild.upsert({
     *   create: {
     *     // ... data to create a Guild
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Guild we want to update
     *   }
     * })
     */
    upsert<T extends GuildUpsertArgs>(args: SelectSubset<T, GuildUpsertArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Guilds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildCountArgs} args - Arguments to filter Guilds to count.
     * @example
     * // Count the number of Guilds
     * const count = await prisma.guild.count({
     *   where: {
     *     // ... the filter for the Guilds we want to count
     *   }
     * })
    **/
    count<T extends GuildCountArgs>(
      args?: Subset<T, GuildCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuildCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Guild.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuildAggregateArgs>(args: Subset<T, GuildAggregateArgs>): Prisma.PrismaPromise<GetGuildAggregateType<T>>

    /**
     * Group by Guild.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GuildGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuildGroupByArgs['orderBy'] }
        : { orderBy?: GuildGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GuildGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuildGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Guild model
   */
  readonly fields: GuildFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Guild.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuildClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    guildBotSettings<T extends Guild$guildBotSettingsArgs<ExtArgs> = {}>(args?: Subset<T, Guild$guildBotSettingsArgs<ExtArgs>>): Prisma__GuildBotSettingsClient<$Result.GetResult<Prisma.$GuildBotSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Guild model
   */
  interface GuildFieldRefs {
    readonly guildId: FieldRef<"Guild", 'String'>
    readonly premiumFrom: FieldRef<"Guild", 'DateTime'>
    readonly premiumTo: FieldRef<"Guild", 'DateTime'>
    readonly premiumPlan: FieldRef<"Guild", 'PremiumPlan'>
    readonly language: FieldRef<"Guild", 'String'>
    readonly customBotName: FieldRef<"Guild", 'String'>
    readonly embedColor: FieldRef<"Guild", 'String'>
    readonly defaultVolume: FieldRef<"Guild", 'Int'>
    readonly enable247: FieldRef<"Guild", 'Boolean'>
    readonly enableAutoplay: FieldRef<"Guild", 'Boolean'>
    readonly enableVoteSkip: FieldRef<"Guild", 'Boolean'>
    readonly isActive: FieldRef<"Guild", 'Boolean'>
    readonly lastActivity: FieldRef<"Guild", 'DateTime'>
    readonly totalCommands: FieldRef<"Guild", 'Int'>
    readonly premiumSlots: FieldRef<"Guild", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Guild findUnique
   */
  export type GuildFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * Filter, which Guild to fetch.
     */
    where: GuildWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Guild findUniqueOrThrow
   */
  export type GuildFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * Filter, which Guild to fetch.
     */
    where: GuildWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Guild findFirst
   */
  export type GuildFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * Filter, which Guild to fetch.
     */
    where?: GuildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guilds to fetch.
     */
    orderBy?: GuildOrderByWithRelationInput | GuildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Guilds.
     */
    cursor?: GuildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guilds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guilds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Guilds.
     */
    distinct?: GuildScalarFieldEnum | GuildScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Guild findFirstOrThrow
   */
  export type GuildFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * Filter, which Guild to fetch.
     */
    where?: GuildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guilds to fetch.
     */
    orderBy?: GuildOrderByWithRelationInput | GuildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Guilds.
     */
    cursor?: GuildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guilds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guilds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Guilds.
     */
    distinct?: GuildScalarFieldEnum | GuildScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Guild findMany
   */
  export type GuildFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * Filter, which Guilds to fetch.
     */
    where?: GuildWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Guilds to fetch.
     */
    orderBy?: GuildOrderByWithRelationInput | GuildOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Guilds.
     */
    cursor?: GuildWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Guilds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Guilds.
     */
    skip?: number
    distinct?: GuildScalarFieldEnum | GuildScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Guild create
   */
  export type GuildCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * The data needed to create a Guild.
     */
    data: XOR<GuildCreateInput, GuildUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Guild createMany
   */
  export type GuildCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Guilds.
     */
    data: GuildCreateManyInput | GuildCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Guild createManyAndReturn
   */
  export type GuildCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * The data used to create many Guilds.
     */
    data: GuildCreateManyInput | GuildCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Guild update
   */
  export type GuildUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * The data needed to update a Guild.
     */
    data: XOR<GuildUpdateInput, GuildUncheckedUpdateInput>
    /**
     * Choose, which Guild to update.
     */
    where: GuildWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Guild updateMany
   */
  export type GuildUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Guilds.
     */
    data: XOR<GuildUpdateManyMutationInput, GuildUncheckedUpdateManyInput>
    /**
     * Filter which Guilds to update
     */
    where?: GuildWhereInput
    /**
     * Limit how many Guilds to update.
     */
    limit?: number
  }

  /**
   * Guild updateManyAndReturn
   */
  export type GuildUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * The data used to update Guilds.
     */
    data: XOR<GuildUpdateManyMutationInput, GuildUncheckedUpdateManyInput>
    /**
     * Filter which Guilds to update
     */
    where?: GuildWhereInput
    /**
     * Limit how many Guilds to update.
     */
    limit?: number
  }

  /**
   * Guild upsert
   */
  export type GuildUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * The filter to search for the Guild to update in case it exists.
     */
    where: GuildWhereUniqueInput
    /**
     * In case the Guild found by the `where` argument doesn't exist, create a new Guild with this data.
     */
    create: XOR<GuildCreateInput, GuildUncheckedCreateInput>
    /**
     * In case the Guild was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuildUpdateInput, GuildUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Guild delete
   */
  export type GuildDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
    /**
     * Filter which Guild to delete.
     */
    where: GuildWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Guild deleteMany
   */
  export type GuildDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Guilds to delete
     */
    where?: GuildWhereInput
    /**
     * Limit how many Guilds to delete.
     */
    limit?: number
  }

  /**
   * Guild.guildBotSettings
   */
  export type Guild$guildBotSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildBotSettings
     */
    select?: GuildBotSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildBotSettings
     */
    omit?: GuildBotSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildBotSettingsInclude<ExtArgs> | null
    where?: GuildBotSettingsWhereInput
  }

  /**
   * Guild without action
   */
  export type GuildDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Guild
     */
    select?: GuildSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Guild
     */
    omit?: GuildOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    userId: string | null
    username: string | null
    discriminator: string | null
    avatar: string | null
    email: string | null
    premiumFrom: Date | null
    premiumTo: Date | null
    premiumPlan: $Enums.PremiumPlan | null
    premiumPlus: boolean | null
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    userId: string | null
    username: string | null
    discriminator: string | null
    avatar: string | null
    email: string | null
    premiumFrom: Date | null
    premiumTo: Date | null
    premiumPlan: $Enums.PremiumPlan | null
    premiumPlus: boolean | null
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    userId: number
    username: number
    discriminator: number
    avatar: number
    email: number
    premiumFrom: number
    premiumTo: number
    premiumPlan: number
    premiumPlus: number
    stripeCustomerId: number
    stripeSubscriptionId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    userId?: true
    username?: true
    discriminator?: true
    avatar?: true
    email?: true
    premiumFrom?: true
    premiumTo?: true
    premiumPlan?: true
    premiumPlus?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    userId?: true
    username?: true
    discriminator?: true
    avatar?: true
    email?: true
    premiumFrom?: true
    premiumTo?: true
    premiumPlan?: true
    premiumPlus?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    userId?: true
    username?: true
    discriminator?: true
    avatar?: true
    email?: true
    premiumFrom?: true
    premiumTo?: true
    premiumPlan?: true
    premiumPlus?: true
    stripeCustomerId?: true
    stripeSubscriptionId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    userId: string
    username: string | null
    discriminator: string | null
    avatar: string | null
    email: string | null
    premiumFrom: Date | null
    premiumTo: Date | null
    premiumPlan: $Enums.PremiumPlan
    premiumPlus: boolean
    stripeCustomerId: string | null
    stripeSubscriptionId: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    username?: boolean
    discriminator?: boolean
    avatar?: boolean
    email?: boolean
    premiumFrom?: boolean
    premiumTo?: boolean
    premiumPlan?: boolean
    premiumPlus?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    playlists?: boolean | User$playlistsArgs<ExtArgs>
    botInstance?: boolean | User$botInstanceArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    guildOwner?: boolean | User$guildOwnerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    username?: boolean
    discriminator?: boolean
    avatar?: boolean
    email?: boolean
    premiumFrom?: boolean
    premiumTo?: boolean
    premiumPlan?: boolean
    premiumPlus?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    username?: boolean
    discriminator?: boolean
    avatar?: boolean
    email?: boolean
    premiumFrom?: boolean
    premiumTo?: boolean
    premiumPlan?: boolean
    premiumPlus?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    userId?: boolean
    username?: boolean
    discriminator?: boolean
    avatar?: boolean
    email?: boolean
    premiumFrom?: boolean
    premiumTo?: boolean
    premiumPlan?: boolean
    premiumPlus?: boolean
    stripeCustomerId?: boolean
    stripeSubscriptionId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "username" | "discriminator" | "avatar" | "email" | "premiumFrom" | "premiumTo" | "premiumPlan" | "premiumPlus" | "stripeCustomerId" | "stripeSubscriptionId" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    playlists?: boolean | User$playlistsArgs<ExtArgs>
    botInstance?: boolean | User$botInstanceArgs<ExtArgs>
    payments?: boolean | User$paymentsArgs<ExtArgs>
    guildOwner?: boolean | User$guildOwnerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      playlists: Prisma.$PlaylistPayload<ExtArgs>[]
      botInstance: Prisma.$BotInstancePayload<ExtArgs> | null
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      guildOwner: Prisma.$GuildOwnerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      username: string | null
      discriminator: string | null
      avatar: string | null
      email: string | null
      premiumFrom: Date | null
      premiumTo: Date | null
      premiumPlan: $Enums.PremiumPlan
      premiumPlus: boolean
      stripeCustomerId: string | null
      stripeSubscriptionId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userWithUserIdOnly = await prisma.user.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `userId`
     * const userWithUserIdOnly = await prisma.user.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `userId`
     * const userWithUserIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    playlists<T extends User$playlistsArgs<ExtArgs> = {}>(args?: Subset<T, User$playlistsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlaylistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    botInstance<T extends User$botInstanceArgs<ExtArgs> = {}>(args?: Subset<T, User$botInstanceArgs<ExtArgs>>): Prisma__BotInstanceClient<$Result.GetResult<Prisma.$BotInstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    payments<T extends User$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, User$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    guildOwner<T extends User$guildOwnerArgs<ExtArgs> = {}>(args?: Subset<T, User$guildOwnerArgs<ExtArgs>>): Prisma__GuildOwnerClient<$Result.GetResult<Prisma.$GuildOwnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly userId: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly discriminator: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly premiumFrom: FieldRef<"User", 'DateTime'>
    readonly premiumTo: FieldRef<"User", 'DateTime'>
    readonly premiumPlan: FieldRef<"User", 'PremiumPlan'>
    readonly premiumPlus: FieldRef<"User", 'Boolean'>
    readonly stripeCustomerId: FieldRef<"User", 'String'>
    readonly stripeSubscriptionId: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.playlists
   */
  export type User$playlistsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Playlist
     */
    select?: PlaylistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Playlist
     */
    omit?: PlaylistOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlaylistInclude<ExtArgs> | null
    where?: PlaylistWhereInput
    orderBy?: PlaylistOrderByWithRelationInput | PlaylistOrderByWithRelationInput[]
    cursor?: PlaylistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlaylistScalarFieldEnum | PlaylistScalarFieldEnum[]
  }

  /**
   * User.botInstance
   */
  export type User$botInstanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotInstance
     */
    select?: BotInstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotInstance
     */
    omit?: BotInstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInstanceInclude<ExtArgs> | null
    where?: BotInstanceWhereInput
  }

  /**
   * User.payments
   */
  export type User$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * User.guildOwner
   */
  export type User$guildOwnerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildOwner
     */
    select?: GuildOwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildOwner
     */
    omit?: GuildOwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildOwnerInclude<ExtArgs> | null
    where?: GuildOwnerWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model PremiumFeature
   */

  export type AggregatePremiumFeature = {
    _count: PremiumFeatureCountAggregateOutputType | null
    _avg: PremiumFeatureAvgAggregateOutputType | null
    _sum: PremiumFeatureSumAggregateOutputType | null
    _min: PremiumFeatureMinAggregateOutputType | null
    _max: PremiumFeatureMaxAggregateOutputType | null
  }

  export type PremiumFeatureAvgAggregateOutputType = {
    price: number | null
    duration: number | null
  }

  export type PremiumFeatureSumAggregateOutputType = {
    price: number | null
    duration: number | null
  }

  export type PremiumFeatureMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    price: number | null
    duration: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PremiumFeatureMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    price: number | null
    duration: number | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PremiumFeatureCountAggregateOutputType = {
    id: number
    name: number
    description: number
    price: number
    duration: number
    features: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PremiumFeatureAvgAggregateInputType = {
    price?: true
    duration?: true
  }

  export type PremiumFeatureSumAggregateInputType = {
    price?: true
    duration?: true
  }

  export type PremiumFeatureMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    duration?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PremiumFeatureMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    duration?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PremiumFeatureCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    duration?: true
    features?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PremiumFeatureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PremiumFeature to aggregate.
     */
    where?: PremiumFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremiumFeatures to fetch.
     */
    orderBy?: PremiumFeatureOrderByWithRelationInput | PremiumFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PremiumFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremiumFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremiumFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PremiumFeatures
    **/
    _count?: true | PremiumFeatureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PremiumFeatureAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PremiumFeatureSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PremiumFeatureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PremiumFeatureMaxAggregateInputType
  }

  export type GetPremiumFeatureAggregateType<T extends PremiumFeatureAggregateArgs> = {
        [P in keyof T & keyof AggregatePremiumFeature]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePremiumFeature[P]>
      : GetScalarType<T[P], AggregatePremiumFeature[P]>
  }




  export type PremiumFeatureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PremiumFeatureWhereInput
    orderBy?: PremiumFeatureOrderByWithAggregationInput | PremiumFeatureOrderByWithAggregationInput[]
    by: PremiumFeatureScalarFieldEnum[] | PremiumFeatureScalarFieldEnum
    having?: PremiumFeatureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PremiumFeatureCountAggregateInputType | true
    _avg?: PremiumFeatureAvgAggregateInputType
    _sum?: PremiumFeatureSumAggregateInputType
    _min?: PremiumFeatureMinAggregateInputType
    _max?: PremiumFeatureMaxAggregateInputType
  }

  export type PremiumFeatureGroupByOutputType = {
    id: string
    name: string
    description: string | null
    price: number | null
    duration: number | null
    features: string[]
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: PremiumFeatureCountAggregateOutputType | null
    _avg: PremiumFeatureAvgAggregateOutputType | null
    _sum: PremiumFeatureSumAggregateOutputType | null
    _min: PremiumFeatureMinAggregateOutputType | null
    _max: PremiumFeatureMaxAggregateOutputType | null
  }

  type GetPremiumFeatureGroupByPayload<T extends PremiumFeatureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PremiumFeatureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PremiumFeatureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PremiumFeatureGroupByOutputType[P]>
            : GetScalarType<T[P], PremiumFeatureGroupByOutputType[P]>
        }
      >
    >


  export type PremiumFeatureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    duration?: boolean
    features?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["premiumFeature"]>

  export type PremiumFeatureSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    duration?: boolean
    features?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["premiumFeature"]>

  export type PremiumFeatureSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    duration?: boolean
    features?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["premiumFeature"]>

  export type PremiumFeatureSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    duration?: boolean
    features?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PremiumFeatureOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "price" | "duration" | "features" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["premiumFeature"]>

  export type $PremiumFeaturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PremiumFeature"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      price: number | null
      duration: number | null
      features: string[]
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["premiumFeature"]>
    composites: {}
  }

  type PremiumFeatureGetPayload<S extends boolean | null | undefined | PremiumFeatureDefaultArgs> = $Result.GetResult<Prisma.$PremiumFeaturePayload, S>

  type PremiumFeatureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PremiumFeatureFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: PremiumFeatureCountAggregateInputType | true
    }

  export interface PremiumFeatureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PremiumFeature'], meta: { name: 'PremiumFeature' } }
    /**
     * Find zero or one PremiumFeature that matches the filter.
     * @param {PremiumFeatureFindUniqueArgs} args - Arguments to find a PremiumFeature
     * @example
     * // Get one PremiumFeature
     * const premiumFeature = await prisma.premiumFeature.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PremiumFeatureFindUniqueArgs>(args: SelectSubset<T, PremiumFeatureFindUniqueArgs<ExtArgs>>): Prisma__PremiumFeatureClient<$Result.GetResult<Prisma.$PremiumFeaturePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PremiumFeature that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PremiumFeatureFindUniqueOrThrowArgs} args - Arguments to find a PremiumFeature
     * @example
     * // Get one PremiumFeature
     * const premiumFeature = await prisma.premiumFeature.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PremiumFeatureFindUniqueOrThrowArgs>(args: SelectSubset<T, PremiumFeatureFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PremiumFeatureClient<$Result.GetResult<Prisma.$PremiumFeaturePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PremiumFeature that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiumFeatureFindFirstArgs} args - Arguments to find a PremiumFeature
     * @example
     * // Get one PremiumFeature
     * const premiumFeature = await prisma.premiumFeature.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PremiumFeatureFindFirstArgs>(args?: SelectSubset<T, PremiumFeatureFindFirstArgs<ExtArgs>>): Prisma__PremiumFeatureClient<$Result.GetResult<Prisma.$PremiumFeaturePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PremiumFeature that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiumFeatureFindFirstOrThrowArgs} args - Arguments to find a PremiumFeature
     * @example
     * // Get one PremiumFeature
     * const premiumFeature = await prisma.premiumFeature.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PremiumFeatureFindFirstOrThrowArgs>(args?: SelectSubset<T, PremiumFeatureFindFirstOrThrowArgs<ExtArgs>>): Prisma__PremiumFeatureClient<$Result.GetResult<Prisma.$PremiumFeaturePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PremiumFeatures that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiumFeatureFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PremiumFeatures
     * const premiumFeatures = await prisma.premiumFeature.findMany()
     * 
     * // Get first 10 PremiumFeatures
     * const premiumFeatures = await prisma.premiumFeature.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const premiumFeatureWithIdOnly = await prisma.premiumFeature.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PremiumFeatureFindManyArgs>(args?: SelectSubset<T, PremiumFeatureFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremiumFeaturePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PremiumFeature.
     * @param {PremiumFeatureCreateArgs} args - Arguments to create a PremiumFeature.
     * @example
     * // Create one PremiumFeature
     * const PremiumFeature = await prisma.premiumFeature.create({
     *   data: {
     *     // ... data to create a PremiumFeature
     *   }
     * })
     * 
     */
    create<T extends PremiumFeatureCreateArgs>(args: SelectSubset<T, PremiumFeatureCreateArgs<ExtArgs>>): Prisma__PremiumFeatureClient<$Result.GetResult<Prisma.$PremiumFeaturePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PremiumFeatures.
     * @param {PremiumFeatureCreateManyArgs} args - Arguments to create many PremiumFeatures.
     * @example
     * // Create many PremiumFeatures
     * const premiumFeature = await prisma.premiumFeature.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PremiumFeatureCreateManyArgs>(args?: SelectSubset<T, PremiumFeatureCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PremiumFeatures and returns the data saved in the database.
     * @param {PremiumFeatureCreateManyAndReturnArgs} args - Arguments to create many PremiumFeatures.
     * @example
     * // Create many PremiumFeatures
     * const premiumFeature = await prisma.premiumFeature.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PremiumFeatures and only return the `id`
     * const premiumFeatureWithIdOnly = await prisma.premiumFeature.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PremiumFeatureCreateManyAndReturnArgs>(args?: SelectSubset<T, PremiumFeatureCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremiumFeaturePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PremiumFeature.
     * @param {PremiumFeatureDeleteArgs} args - Arguments to delete one PremiumFeature.
     * @example
     * // Delete one PremiumFeature
     * const PremiumFeature = await prisma.premiumFeature.delete({
     *   where: {
     *     // ... filter to delete one PremiumFeature
     *   }
     * })
     * 
     */
    delete<T extends PremiumFeatureDeleteArgs>(args: SelectSubset<T, PremiumFeatureDeleteArgs<ExtArgs>>): Prisma__PremiumFeatureClient<$Result.GetResult<Prisma.$PremiumFeaturePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PremiumFeature.
     * @param {PremiumFeatureUpdateArgs} args - Arguments to update one PremiumFeature.
     * @example
     * // Update one PremiumFeature
     * const premiumFeature = await prisma.premiumFeature.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PremiumFeatureUpdateArgs>(args: SelectSubset<T, PremiumFeatureUpdateArgs<ExtArgs>>): Prisma__PremiumFeatureClient<$Result.GetResult<Prisma.$PremiumFeaturePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PremiumFeatures.
     * @param {PremiumFeatureDeleteManyArgs} args - Arguments to filter PremiumFeatures to delete.
     * @example
     * // Delete a few PremiumFeatures
     * const { count } = await prisma.premiumFeature.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PremiumFeatureDeleteManyArgs>(args?: SelectSubset<T, PremiumFeatureDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PremiumFeatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiumFeatureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PremiumFeatures
     * const premiumFeature = await prisma.premiumFeature.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PremiumFeatureUpdateManyArgs>(args: SelectSubset<T, PremiumFeatureUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PremiumFeatures and returns the data updated in the database.
     * @param {PremiumFeatureUpdateManyAndReturnArgs} args - Arguments to update many PremiumFeatures.
     * @example
     * // Update many PremiumFeatures
     * const premiumFeature = await prisma.premiumFeature.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PremiumFeatures and only return the `id`
     * const premiumFeatureWithIdOnly = await prisma.premiumFeature.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PremiumFeatureUpdateManyAndReturnArgs>(args: SelectSubset<T, PremiumFeatureUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PremiumFeaturePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PremiumFeature.
     * @param {PremiumFeatureUpsertArgs} args - Arguments to update or create a PremiumFeature.
     * @example
     * // Update or create a PremiumFeature
     * const premiumFeature = await prisma.premiumFeature.upsert({
     *   create: {
     *     // ... data to create a PremiumFeature
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PremiumFeature we want to update
     *   }
     * })
     */
    upsert<T extends PremiumFeatureUpsertArgs>(args: SelectSubset<T, PremiumFeatureUpsertArgs<ExtArgs>>): Prisma__PremiumFeatureClient<$Result.GetResult<Prisma.$PremiumFeaturePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PremiumFeatures.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiumFeatureCountArgs} args - Arguments to filter PremiumFeatures to count.
     * @example
     * // Count the number of PremiumFeatures
     * const count = await prisma.premiumFeature.count({
     *   where: {
     *     // ... the filter for the PremiumFeatures we want to count
     *   }
     * })
    **/
    count<T extends PremiumFeatureCountArgs>(
      args?: Subset<T, PremiumFeatureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PremiumFeatureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PremiumFeature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiumFeatureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PremiumFeatureAggregateArgs>(args: Subset<T, PremiumFeatureAggregateArgs>): Prisma.PrismaPromise<GetPremiumFeatureAggregateType<T>>

    /**
     * Group by PremiumFeature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PremiumFeatureGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PremiumFeatureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PremiumFeatureGroupByArgs['orderBy'] }
        : { orderBy?: PremiumFeatureGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PremiumFeatureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPremiumFeatureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PremiumFeature model
   */
  readonly fields: PremiumFeatureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PremiumFeature.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PremiumFeatureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PremiumFeature model
   */
  interface PremiumFeatureFieldRefs {
    readonly id: FieldRef<"PremiumFeature", 'String'>
    readonly name: FieldRef<"PremiumFeature", 'String'>
    readonly description: FieldRef<"PremiumFeature", 'String'>
    readonly price: FieldRef<"PremiumFeature", 'Float'>
    readonly duration: FieldRef<"PremiumFeature", 'Int'>
    readonly features: FieldRef<"PremiumFeature", 'String[]'>
    readonly isActive: FieldRef<"PremiumFeature", 'Boolean'>
    readonly createdAt: FieldRef<"PremiumFeature", 'DateTime'>
    readonly updatedAt: FieldRef<"PremiumFeature", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PremiumFeature findUnique
   */
  export type PremiumFeatureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumFeature
     */
    select?: PremiumFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumFeature
     */
    omit?: PremiumFeatureOmit<ExtArgs> | null
    /**
     * Filter, which PremiumFeature to fetch.
     */
    where: PremiumFeatureWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PremiumFeature findUniqueOrThrow
   */
  export type PremiumFeatureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumFeature
     */
    select?: PremiumFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumFeature
     */
    omit?: PremiumFeatureOmit<ExtArgs> | null
    /**
     * Filter, which PremiumFeature to fetch.
     */
    where: PremiumFeatureWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PremiumFeature findFirst
   */
  export type PremiumFeatureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumFeature
     */
    select?: PremiumFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumFeature
     */
    omit?: PremiumFeatureOmit<ExtArgs> | null
    /**
     * Filter, which PremiumFeature to fetch.
     */
    where?: PremiumFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremiumFeatures to fetch.
     */
    orderBy?: PremiumFeatureOrderByWithRelationInput | PremiumFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PremiumFeatures.
     */
    cursor?: PremiumFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremiumFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremiumFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PremiumFeatures.
     */
    distinct?: PremiumFeatureScalarFieldEnum | PremiumFeatureScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PremiumFeature findFirstOrThrow
   */
  export type PremiumFeatureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumFeature
     */
    select?: PremiumFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumFeature
     */
    omit?: PremiumFeatureOmit<ExtArgs> | null
    /**
     * Filter, which PremiumFeature to fetch.
     */
    where?: PremiumFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremiumFeatures to fetch.
     */
    orderBy?: PremiumFeatureOrderByWithRelationInput | PremiumFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PremiumFeatures.
     */
    cursor?: PremiumFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremiumFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremiumFeatures.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PremiumFeatures.
     */
    distinct?: PremiumFeatureScalarFieldEnum | PremiumFeatureScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PremiumFeature findMany
   */
  export type PremiumFeatureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumFeature
     */
    select?: PremiumFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumFeature
     */
    omit?: PremiumFeatureOmit<ExtArgs> | null
    /**
     * Filter, which PremiumFeatures to fetch.
     */
    where?: PremiumFeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PremiumFeatures to fetch.
     */
    orderBy?: PremiumFeatureOrderByWithRelationInput | PremiumFeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PremiumFeatures.
     */
    cursor?: PremiumFeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PremiumFeatures from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PremiumFeatures.
     */
    skip?: number
    distinct?: PremiumFeatureScalarFieldEnum | PremiumFeatureScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PremiumFeature create
   */
  export type PremiumFeatureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumFeature
     */
    select?: PremiumFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumFeature
     */
    omit?: PremiumFeatureOmit<ExtArgs> | null
    /**
     * The data needed to create a PremiumFeature.
     */
    data: XOR<PremiumFeatureCreateInput, PremiumFeatureUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PremiumFeature createMany
   */
  export type PremiumFeatureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PremiumFeatures.
     */
    data: PremiumFeatureCreateManyInput | PremiumFeatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PremiumFeature createManyAndReturn
   */
  export type PremiumFeatureCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumFeature
     */
    select?: PremiumFeatureSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumFeature
     */
    omit?: PremiumFeatureOmit<ExtArgs> | null
    /**
     * The data used to create many PremiumFeatures.
     */
    data: PremiumFeatureCreateManyInput | PremiumFeatureCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PremiumFeature update
   */
  export type PremiumFeatureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumFeature
     */
    select?: PremiumFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumFeature
     */
    omit?: PremiumFeatureOmit<ExtArgs> | null
    /**
     * The data needed to update a PremiumFeature.
     */
    data: XOR<PremiumFeatureUpdateInput, PremiumFeatureUncheckedUpdateInput>
    /**
     * Choose, which PremiumFeature to update.
     */
    where: PremiumFeatureWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PremiumFeature updateMany
   */
  export type PremiumFeatureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PremiumFeatures.
     */
    data: XOR<PremiumFeatureUpdateManyMutationInput, PremiumFeatureUncheckedUpdateManyInput>
    /**
     * Filter which PremiumFeatures to update
     */
    where?: PremiumFeatureWhereInput
    /**
     * Limit how many PremiumFeatures to update.
     */
    limit?: number
  }

  /**
   * PremiumFeature updateManyAndReturn
   */
  export type PremiumFeatureUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumFeature
     */
    select?: PremiumFeatureSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumFeature
     */
    omit?: PremiumFeatureOmit<ExtArgs> | null
    /**
     * The data used to update PremiumFeatures.
     */
    data: XOR<PremiumFeatureUpdateManyMutationInput, PremiumFeatureUncheckedUpdateManyInput>
    /**
     * Filter which PremiumFeatures to update
     */
    where?: PremiumFeatureWhereInput
    /**
     * Limit how many PremiumFeatures to update.
     */
    limit?: number
  }

  /**
   * PremiumFeature upsert
   */
  export type PremiumFeatureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumFeature
     */
    select?: PremiumFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumFeature
     */
    omit?: PremiumFeatureOmit<ExtArgs> | null
    /**
     * The filter to search for the PremiumFeature to update in case it exists.
     */
    where: PremiumFeatureWhereUniqueInput
    /**
     * In case the PremiumFeature found by the `where` argument doesn't exist, create a new PremiumFeature with this data.
     */
    create: XOR<PremiumFeatureCreateInput, PremiumFeatureUncheckedCreateInput>
    /**
     * In case the PremiumFeature was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PremiumFeatureUpdateInput, PremiumFeatureUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PremiumFeature delete
   */
  export type PremiumFeatureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumFeature
     */
    select?: PremiumFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumFeature
     */
    omit?: PremiumFeatureOmit<ExtArgs> | null
    /**
     * Filter which PremiumFeature to delete.
     */
    where: PremiumFeatureWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * PremiumFeature deleteMany
   */
  export type PremiumFeatureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PremiumFeatures to delete
     */
    where?: PremiumFeatureWhereInput
    /**
     * Limit how many PremiumFeatures to delete.
     */
    limit?: number
  }

  /**
   * PremiumFeature without action
   */
  export type PremiumFeatureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PremiumFeature
     */
    select?: PremiumFeatureSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PremiumFeature
     */
    omit?: PremiumFeatureOmit<ExtArgs> | null
  }


  /**
   * Model GuildBotSettings
   */

  export type AggregateGuildBotSettings = {
    _count: GuildBotSettingsCountAggregateOutputType | null
    _min: GuildBotSettingsMinAggregateOutputType | null
    _max: GuildBotSettingsMaxAggregateOutputType | null
  }

  export type GuildBotSettingsMinAggregateOutputType = {
    id: string | null
    guildId: string | null
    botName: string | null
    botAvatar: string | null
    embedColor: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GuildBotSettingsMaxAggregateOutputType = {
    id: string | null
    guildId: string | null
    botName: string | null
    botAvatar: string | null
    embedColor: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type GuildBotSettingsCountAggregateOutputType = {
    id: number
    guildId: number
    botName: number
    botAvatar: number
    embedColor: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type GuildBotSettingsMinAggregateInputType = {
    id?: true
    guildId?: true
    botName?: true
    botAvatar?: true
    embedColor?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GuildBotSettingsMaxAggregateInputType = {
    id?: true
    guildId?: true
    botName?: true
    botAvatar?: true
    embedColor?: true
    createdAt?: true
    updatedAt?: true
  }

  export type GuildBotSettingsCountAggregateInputType = {
    id?: true
    guildId?: true
    botName?: true
    botAvatar?: true
    embedColor?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type GuildBotSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuildBotSettings to aggregate.
     */
    where?: GuildBotSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildBotSettings to fetch.
     */
    orderBy?: GuildBotSettingsOrderByWithRelationInput | GuildBotSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuildBotSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildBotSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildBotSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GuildBotSettings
    **/
    _count?: true | GuildBotSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuildBotSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuildBotSettingsMaxAggregateInputType
  }

  export type GetGuildBotSettingsAggregateType<T extends GuildBotSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateGuildBotSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuildBotSettings[P]>
      : GetScalarType<T[P], AggregateGuildBotSettings[P]>
  }




  export type GuildBotSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuildBotSettingsWhereInput
    orderBy?: GuildBotSettingsOrderByWithAggregationInput | GuildBotSettingsOrderByWithAggregationInput[]
    by: GuildBotSettingsScalarFieldEnum[] | GuildBotSettingsScalarFieldEnum
    having?: GuildBotSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuildBotSettingsCountAggregateInputType | true
    _min?: GuildBotSettingsMinAggregateInputType
    _max?: GuildBotSettingsMaxAggregateInputType
  }

  export type GuildBotSettingsGroupByOutputType = {
    id: string
    guildId: string
    botName: string | null
    botAvatar: string | null
    embedColor: string | null
    createdAt: Date
    updatedAt: Date
    _count: GuildBotSettingsCountAggregateOutputType | null
    _min: GuildBotSettingsMinAggregateOutputType | null
    _max: GuildBotSettingsMaxAggregateOutputType | null
  }

  type GetGuildBotSettingsGroupByPayload<T extends GuildBotSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuildBotSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuildBotSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuildBotSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], GuildBotSettingsGroupByOutputType[P]>
        }
      >
    >


  export type GuildBotSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    guildId?: boolean
    botName?: boolean
    botAvatar?: boolean
    embedColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    guild?: boolean | GuildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guildBotSettings"]>

  export type GuildBotSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    guildId?: boolean
    botName?: boolean
    botAvatar?: boolean
    embedColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    guild?: boolean | GuildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guildBotSettings"]>

  export type GuildBotSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    guildId?: boolean
    botName?: boolean
    botAvatar?: boolean
    embedColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    guild?: boolean | GuildDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guildBotSettings"]>

  export type GuildBotSettingsSelectScalar = {
    id?: boolean
    guildId?: boolean
    botName?: boolean
    botAvatar?: boolean
    embedColor?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type GuildBotSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "guildId" | "botName" | "botAvatar" | "embedColor" | "createdAt" | "updatedAt", ExtArgs["result"]["guildBotSettings"]>
  export type GuildBotSettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guild?: boolean | GuildDefaultArgs<ExtArgs>
  }
  export type GuildBotSettingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guild?: boolean | GuildDefaultArgs<ExtArgs>
  }
  export type GuildBotSettingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    guild?: boolean | GuildDefaultArgs<ExtArgs>
  }

  export type $GuildBotSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GuildBotSettings"
    objects: {
      guild: Prisma.$GuildPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      guildId: string
      botName: string | null
      botAvatar: string | null
      embedColor: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["guildBotSettings"]>
    composites: {}
  }

  type GuildBotSettingsGetPayload<S extends boolean | null | undefined | GuildBotSettingsDefaultArgs> = $Result.GetResult<Prisma.$GuildBotSettingsPayload, S>

  type GuildBotSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GuildBotSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: GuildBotSettingsCountAggregateInputType | true
    }

  export interface GuildBotSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GuildBotSettings'], meta: { name: 'GuildBotSettings' } }
    /**
     * Find zero or one GuildBotSettings that matches the filter.
     * @param {GuildBotSettingsFindUniqueArgs} args - Arguments to find a GuildBotSettings
     * @example
     * // Get one GuildBotSettings
     * const guildBotSettings = await prisma.guildBotSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuildBotSettingsFindUniqueArgs>(args: SelectSubset<T, GuildBotSettingsFindUniqueArgs<ExtArgs>>): Prisma__GuildBotSettingsClient<$Result.GetResult<Prisma.$GuildBotSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GuildBotSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GuildBotSettingsFindUniqueOrThrowArgs} args - Arguments to find a GuildBotSettings
     * @example
     * // Get one GuildBotSettings
     * const guildBotSettings = await prisma.guildBotSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuildBotSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, GuildBotSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuildBotSettingsClient<$Result.GetResult<Prisma.$GuildBotSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GuildBotSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildBotSettingsFindFirstArgs} args - Arguments to find a GuildBotSettings
     * @example
     * // Get one GuildBotSettings
     * const guildBotSettings = await prisma.guildBotSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuildBotSettingsFindFirstArgs>(args?: SelectSubset<T, GuildBotSettingsFindFirstArgs<ExtArgs>>): Prisma__GuildBotSettingsClient<$Result.GetResult<Prisma.$GuildBotSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GuildBotSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildBotSettingsFindFirstOrThrowArgs} args - Arguments to find a GuildBotSettings
     * @example
     * // Get one GuildBotSettings
     * const guildBotSettings = await prisma.guildBotSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuildBotSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, GuildBotSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuildBotSettingsClient<$Result.GetResult<Prisma.$GuildBotSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GuildBotSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildBotSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GuildBotSettings
     * const guildBotSettings = await prisma.guildBotSettings.findMany()
     * 
     * // Get first 10 GuildBotSettings
     * const guildBotSettings = await prisma.guildBotSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const guildBotSettingsWithIdOnly = await prisma.guildBotSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GuildBotSettingsFindManyArgs>(args?: SelectSubset<T, GuildBotSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildBotSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GuildBotSettings.
     * @param {GuildBotSettingsCreateArgs} args - Arguments to create a GuildBotSettings.
     * @example
     * // Create one GuildBotSettings
     * const GuildBotSettings = await prisma.guildBotSettings.create({
     *   data: {
     *     // ... data to create a GuildBotSettings
     *   }
     * })
     * 
     */
    create<T extends GuildBotSettingsCreateArgs>(args: SelectSubset<T, GuildBotSettingsCreateArgs<ExtArgs>>): Prisma__GuildBotSettingsClient<$Result.GetResult<Prisma.$GuildBotSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GuildBotSettings.
     * @param {GuildBotSettingsCreateManyArgs} args - Arguments to create many GuildBotSettings.
     * @example
     * // Create many GuildBotSettings
     * const guildBotSettings = await prisma.guildBotSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuildBotSettingsCreateManyArgs>(args?: SelectSubset<T, GuildBotSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GuildBotSettings and returns the data saved in the database.
     * @param {GuildBotSettingsCreateManyAndReturnArgs} args - Arguments to create many GuildBotSettings.
     * @example
     * // Create many GuildBotSettings
     * const guildBotSettings = await prisma.guildBotSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GuildBotSettings and only return the `id`
     * const guildBotSettingsWithIdOnly = await prisma.guildBotSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GuildBotSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, GuildBotSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildBotSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GuildBotSettings.
     * @param {GuildBotSettingsDeleteArgs} args - Arguments to delete one GuildBotSettings.
     * @example
     * // Delete one GuildBotSettings
     * const GuildBotSettings = await prisma.guildBotSettings.delete({
     *   where: {
     *     // ... filter to delete one GuildBotSettings
     *   }
     * })
     * 
     */
    delete<T extends GuildBotSettingsDeleteArgs>(args: SelectSubset<T, GuildBotSettingsDeleteArgs<ExtArgs>>): Prisma__GuildBotSettingsClient<$Result.GetResult<Prisma.$GuildBotSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GuildBotSettings.
     * @param {GuildBotSettingsUpdateArgs} args - Arguments to update one GuildBotSettings.
     * @example
     * // Update one GuildBotSettings
     * const guildBotSettings = await prisma.guildBotSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuildBotSettingsUpdateArgs>(args: SelectSubset<T, GuildBotSettingsUpdateArgs<ExtArgs>>): Prisma__GuildBotSettingsClient<$Result.GetResult<Prisma.$GuildBotSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GuildBotSettings.
     * @param {GuildBotSettingsDeleteManyArgs} args - Arguments to filter GuildBotSettings to delete.
     * @example
     * // Delete a few GuildBotSettings
     * const { count } = await prisma.guildBotSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuildBotSettingsDeleteManyArgs>(args?: SelectSubset<T, GuildBotSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuildBotSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildBotSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GuildBotSettings
     * const guildBotSettings = await prisma.guildBotSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuildBotSettingsUpdateManyArgs>(args: SelectSubset<T, GuildBotSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuildBotSettings and returns the data updated in the database.
     * @param {GuildBotSettingsUpdateManyAndReturnArgs} args - Arguments to update many GuildBotSettings.
     * @example
     * // Update many GuildBotSettings
     * const guildBotSettings = await prisma.guildBotSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GuildBotSettings and only return the `id`
     * const guildBotSettingsWithIdOnly = await prisma.guildBotSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GuildBotSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, GuildBotSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildBotSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GuildBotSettings.
     * @param {GuildBotSettingsUpsertArgs} args - Arguments to update or create a GuildBotSettings.
     * @example
     * // Update or create a GuildBotSettings
     * const guildBotSettings = await prisma.guildBotSettings.upsert({
     *   create: {
     *     // ... data to create a GuildBotSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GuildBotSettings we want to update
     *   }
     * })
     */
    upsert<T extends GuildBotSettingsUpsertArgs>(args: SelectSubset<T, GuildBotSettingsUpsertArgs<ExtArgs>>): Prisma__GuildBotSettingsClient<$Result.GetResult<Prisma.$GuildBotSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GuildBotSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildBotSettingsCountArgs} args - Arguments to filter GuildBotSettings to count.
     * @example
     * // Count the number of GuildBotSettings
     * const count = await prisma.guildBotSettings.count({
     *   where: {
     *     // ... the filter for the GuildBotSettings we want to count
     *   }
     * })
    **/
    count<T extends GuildBotSettingsCountArgs>(
      args?: Subset<T, GuildBotSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuildBotSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GuildBotSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildBotSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuildBotSettingsAggregateArgs>(args: Subset<T, GuildBotSettingsAggregateArgs>): Prisma.PrismaPromise<GetGuildBotSettingsAggregateType<T>>

    /**
     * Group by GuildBotSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildBotSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GuildBotSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuildBotSettingsGroupByArgs['orderBy'] }
        : { orderBy?: GuildBotSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GuildBotSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuildBotSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GuildBotSettings model
   */
  readonly fields: GuildBotSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GuildBotSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuildBotSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    guild<T extends GuildDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GuildDefaultArgs<ExtArgs>>): Prisma__GuildClient<$Result.GetResult<Prisma.$GuildPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GuildBotSettings model
   */
  interface GuildBotSettingsFieldRefs {
    readonly id: FieldRef<"GuildBotSettings", 'String'>
    readonly guildId: FieldRef<"GuildBotSettings", 'String'>
    readonly botName: FieldRef<"GuildBotSettings", 'String'>
    readonly botAvatar: FieldRef<"GuildBotSettings", 'String'>
    readonly embedColor: FieldRef<"GuildBotSettings", 'String'>
    readonly createdAt: FieldRef<"GuildBotSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"GuildBotSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GuildBotSettings findUnique
   */
  export type GuildBotSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildBotSettings
     */
    select?: GuildBotSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildBotSettings
     */
    omit?: GuildBotSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildBotSettingsInclude<ExtArgs> | null
    /**
     * Filter, which GuildBotSettings to fetch.
     */
    where: GuildBotSettingsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildBotSettings findUniqueOrThrow
   */
  export type GuildBotSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildBotSettings
     */
    select?: GuildBotSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildBotSettings
     */
    omit?: GuildBotSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildBotSettingsInclude<ExtArgs> | null
    /**
     * Filter, which GuildBotSettings to fetch.
     */
    where: GuildBotSettingsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildBotSettings findFirst
   */
  export type GuildBotSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildBotSettings
     */
    select?: GuildBotSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildBotSettings
     */
    omit?: GuildBotSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildBotSettingsInclude<ExtArgs> | null
    /**
     * Filter, which GuildBotSettings to fetch.
     */
    where?: GuildBotSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildBotSettings to fetch.
     */
    orderBy?: GuildBotSettingsOrderByWithRelationInput | GuildBotSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuildBotSettings.
     */
    cursor?: GuildBotSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildBotSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildBotSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuildBotSettings.
     */
    distinct?: GuildBotSettingsScalarFieldEnum | GuildBotSettingsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildBotSettings findFirstOrThrow
   */
  export type GuildBotSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildBotSettings
     */
    select?: GuildBotSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildBotSettings
     */
    omit?: GuildBotSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildBotSettingsInclude<ExtArgs> | null
    /**
     * Filter, which GuildBotSettings to fetch.
     */
    where?: GuildBotSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildBotSettings to fetch.
     */
    orderBy?: GuildBotSettingsOrderByWithRelationInput | GuildBotSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuildBotSettings.
     */
    cursor?: GuildBotSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildBotSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildBotSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuildBotSettings.
     */
    distinct?: GuildBotSettingsScalarFieldEnum | GuildBotSettingsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildBotSettings findMany
   */
  export type GuildBotSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildBotSettings
     */
    select?: GuildBotSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildBotSettings
     */
    omit?: GuildBotSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildBotSettingsInclude<ExtArgs> | null
    /**
     * Filter, which GuildBotSettings to fetch.
     */
    where?: GuildBotSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildBotSettings to fetch.
     */
    orderBy?: GuildBotSettingsOrderByWithRelationInput | GuildBotSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GuildBotSettings.
     */
    cursor?: GuildBotSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildBotSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildBotSettings.
     */
    skip?: number
    distinct?: GuildBotSettingsScalarFieldEnum | GuildBotSettingsScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildBotSettings create
   */
  export type GuildBotSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildBotSettings
     */
    select?: GuildBotSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildBotSettings
     */
    omit?: GuildBotSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildBotSettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a GuildBotSettings.
     */
    data: XOR<GuildBotSettingsCreateInput, GuildBotSettingsUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildBotSettings createMany
   */
  export type GuildBotSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GuildBotSettings.
     */
    data: GuildBotSettingsCreateManyInput | GuildBotSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GuildBotSettings createManyAndReturn
   */
  export type GuildBotSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildBotSettings
     */
    select?: GuildBotSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GuildBotSettings
     */
    omit?: GuildBotSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many GuildBotSettings.
     */
    data: GuildBotSettingsCreateManyInput | GuildBotSettingsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildBotSettingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GuildBotSettings update
   */
  export type GuildBotSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildBotSettings
     */
    select?: GuildBotSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildBotSettings
     */
    omit?: GuildBotSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildBotSettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a GuildBotSettings.
     */
    data: XOR<GuildBotSettingsUpdateInput, GuildBotSettingsUncheckedUpdateInput>
    /**
     * Choose, which GuildBotSettings to update.
     */
    where: GuildBotSettingsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildBotSettings updateMany
   */
  export type GuildBotSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GuildBotSettings.
     */
    data: XOR<GuildBotSettingsUpdateManyMutationInput, GuildBotSettingsUncheckedUpdateManyInput>
    /**
     * Filter which GuildBotSettings to update
     */
    where?: GuildBotSettingsWhereInput
    /**
     * Limit how many GuildBotSettings to update.
     */
    limit?: number
  }

  /**
   * GuildBotSettings updateManyAndReturn
   */
  export type GuildBotSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildBotSettings
     */
    select?: GuildBotSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GuildBotSettings
     */
    omit?: GuildBotSettingsOmit<ExtArgs> | null
    /**
     * The data used to update GuildBotSettings.
     */
    data: XOR<GuildBotSettingsUpdateManyMutationInput, GuildBotSettingsUncheckedUpdateManyInput>
    /**
     * Filter which GuildBotSettings to update
     */
    where?: GuildBotSettingsWhereInput
    /**
     * Limit how many GuildBotSettings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildBotSettingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GuildBotSettings upsert
   */
  export type GuildBotSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildBotSettings
     */
    select?: GuildBotSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildBotSettings
     */
    omit?: GuildBotSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildBotSettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the GuildBotSettings to update in case it exists.
     */
    where: GuildBotSettingsWhereUniqueInput
    /**
     * In case the GuildBotSettings found by the `where` argument doesn't exist, create a new GuildBotSettings with this data.
     */
    create: XOR<GuildBotSettingsCreateInput, GuildBotSettingsUncheckedCreateInput>
    /**
     * In case the GuildBotSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuildBotSettingsUpdateInput, GuildBotSettingsUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildBotSettings delete
   */
  export type GuildBotSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildBotSettings
     */
    select?: GuildBotSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildBotSettings
     */
    omit?: GuildBotSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildBotSettingsInclude<ExtArgs> | null
    /**
     * Filter which GuildBotSettings to delete.
     */
    where: GuildBotSettingsWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildBotSettings deleteMany
   */
  export type GuildBotSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuildBotSettings to delete
     */
    where?: GuildBotSettingsWhereInput
    /**
     * Limit how many GuildBotSettings to delete.
     */
    limit?: number
  }

  /**
   * GuildBotSettings without action
   */
  export type GuildBotSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildBotSettings
     */
    select?: GuildBotSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildBotSettings
     */
    omit?: GuildBotSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildBotSettingsInclude<ExtArgs> | null
  }


  /**
   * Model BotInstance
   */

  export type AggregateBotInstance = {
    _count: BotInstanceCountAggregateOutputType | null
    _avg: BotInstanceAvgAggregateOutputType | null
    _sum: BotInstanceSumAggregateOutputType | null
    _min: BotInstanceMinAggregateOutputType | null
    _max: BotInstanceMaxAggregateOutputType | null
  }

  export type BotInstanceAvgAggregateOutputType = {
    defaultVolume: number | null
  }

  export type BotInstanceSumAggregateOutputType = {
    defaultVolume: number | null
  }

  export type BotInstanceMinAggregateOutputType = {
    id: string | null
    userId: string | null
    botToken: string | null
    applicationId: string | null
    botName: string | null
    botStatus: string | null
    botActivity: string | null
    isActive: boolean | null
    pm2ProcessId: string | null
    defaultVolume: number | null
    enable247: boolean | null
    enableAutoplay: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BotInstanceMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    botToken: string | null
    applicationId: string | null
    botName: string | null
    botStatus: string | null
    botActivity: string | null
    isActive: boolean | null
    pm2ProcessId: string | null
    defaultVolume: number | null
    enable247: boolean | null
    enableAutoplay: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BotInstanceCountAggregateOutputType = {
    id: number
    userId: number
    botToken: number
    applicationId: number
    botName: number
    botStatus: number
    botActivity: number
    isActive: number
    pm2ProcessId: number
    defaultVolume: number
    enable247: number
    enableAutoplay: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BotInstanceAvgAggregateInputType = {
    defaultVolume?: true
  }

  export type BotInstanceSumAggregateInputType = {
    defaultVolume?: true
  }

  export type BotInstanceMinAggregateInputType = {
    id?: true
    userId?: true
    botToken?: true
    applicationId?: true
    botName?: true
    botStatus?: true
    botActivity?: true
    isActive?: true
    pm2ProcessId?: true
    defaultVolume?: true
    enable247?: true
    enableAutoplay?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BotInstanceMaxAggregateInputType = {
    id?: true
    userId?: true
    botToken?: true
    applicationId?: true
    botName?: true
    botStatus?: true
    botActivity?: true
    isActive?: true
    pm2ProcessId?: true
    defaultVolume?: true
    enable247?: true
    enableAutoplay?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BotInstanceCountAggregateInputType = {
    id?: true
    userId?: true
    botToken?: true
    applicationId?: true
    botName?: true
    botStatus?: true
    botActivity?: true
    isActive?: true
    pm2ProcessId?: true
    defaultVolume?: true
    enable247?: true
    enableAutoplay?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BotInstanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BotInstance to aggregate.
     */
    where?: BotInstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BotInstances to fetch.
     */
    orderBy?: BotInstanceOrderByWithRelationInput | BotInstanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BotInstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BotInstances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BotInstances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BotInstances
    **/
    _count?: true | BotInstanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BotInstanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BotInstanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BotInstanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BotInstanceMaxAggregateInputType
  }

  export type GetBotInstanceAggregateType<T extends BotInstanceAggregateArgs> = {
        [P in keyof T & keyof AggregateBotInstance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBotInstance[P]>
      : GetScalarType<T[P], AggregateBotInstance[P]>
  }




  export type BotInstanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BotInstanceWhereInput
    orderBy?: BotInstanceOrderByWithAggregationInput | BotInstanceOrderByWithAggregationInput[]
    by: BotInstanceScalarFieldEnum[] | BotInstanceScalarFieldEnum
    having?: BotInstanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BotInstanceCountAggregateInputType | true
    _avg?: BotInstanceAvgAggregateInputType
    _sum?: BotInstanceSumAggregateInputType
    _min?: BotInstanceMinAggregateInputType
    _max?: BotInstanceMaxAggregateInputType
  }

  export type BotInstanceGroupByOutputType = {
    id: string
    userId: string
    botToken: string
    applicationId: string
    botName: string
    botStatus: string
    botActivity: string | null
    isActive: boolean
    pm2ProcessId: string | null
    defaultVolume: number
    enable247: boolean
    enableAutoplay: boolean
    createdAt: Date
    updatedAt: Date
    _count: BotInstanceCountAggregateOutputType | null
    _avg: BotInstanceAvgAggregateOutputType | null
    _sum: BotInstanceSumAggregateOutputType | null
    _min: BotInstanceMinAggregateOutputType | null
    _max: BotInstanceMaxAggregateOutputType | null
  }

  type GetBotInstanceGroupByPayload<T extends BotInstanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BotInstanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BotInstanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BotInstanceGroupByOutputType[P]>
            : GetScalarType<T[P], BotInstanceGroupByOutputType[P]>
        }
      >
    >


  export type BotInstanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    botToken?: boolean
    applicationId?: boolean
    botName?: boolean
    botStatus?: boolean
    botActivity?: boolean
    isActive?: boolean
    pm2ProcessId?: boolean
    defaultVolume?: boolean
    enable247?: boolean
    enableAutoplay?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["botInstance"]>

  export type BotInstanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    botToken?: boolean
    applicationId?: boolean
    botName?: boolean
    botStatus?: boolean
    botActivity?: boolean
    isActive?: boolean
    pm2ProcessId?: boolean
    defaultVolume?: boolean
    enable247?: boolean
    enableAutoplay?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["botInstance"]>

  export type BotInstanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    botToken?: boolean
    applicationId?: boolean
    botName?: boolean
    botStatus?: boolean
    botActivity?: boolean
    isActive?: boolean
    pm2ProcessId?: boolean
    defaultVolume?: boolean
    enable247?: boolean
    enableAutoplay?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["botInstance"]>

  export type BotInstanceSelectScalar = {
    id?: boolean
    userId?: boolean
    botToken?: boolean
    applicationId?: boolean
    botName?: boolean
    botStatus?: boolean
    botActivity?: boolean
    isActive?: boolean
    pm2ProcessId?: boolean
    defaultVolume?: boolean
    enable247?: boolean
    enableAutoplay?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BotInstanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "botToken" | "applicationId" | "botName" | "botStatus" | "botActivity" | "isActive" | "pm2ProcessId" | "defaultVolume" | "enable247" | "enableAutoplay" | "createdAt" | "updatedAt", ExtArgs["result"]["botInstance"]>
  export type BotInstanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BotInstanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BotInstanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BotInstancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BotInstance"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      botToken: string
      applicationId: string
      botName: string
      botStatus: string
      botActivity: string | null
      isActive: boolean
      pm2ProcessId: string | null
      defaultVolume: number
      enable247: boolean
      enableAutoplay: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["botInstance"]>
    composites: {}
  }

  type BotInstanceGetPayload<S extends boolean | null | undefined | BotInstanceDefaultArgs> = $Result.GetResult<Prisma.$BotInstancePayload, S>

  type BotInstanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BotInstanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: BotInstanceCountAggregateInputType | true
    }

  export interface BotInstanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BotInstance'], meta: { name: 'BotInstance' } }
    /**
     * Find zero or one BotInstance that matches the filter.
     * @param {BotInstanceFindUniqueArgs} args - Arguments to find a BotInstance
     * @example
     * // Get one BotInstance
     * const botInstance = await prisma.botInstance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BotInstanceFindUniqueArgs>(args: SelectSubset<T, BotInstanceFindUniqueArgs<ExtArgs>>): Prisma__BotInstanceClient<$Result.GetResult<Prisma.$BotInstancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BotInstance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BotInstanceFindUniqueOrThrowArgs} args - Arguments to find a BotInstance
     * @example
     * // Get one BotInstance
     * const botInstance = await prisma.botInstance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BotInstanceFindUniqueOrThrowArgs>(args: SelectSubset<T, BotInstanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BotInstanceClient<$Result.GetResult<Prisma.$BotInstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BotInstance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotInstanceFindFirstArgs} args - Arguments to find a BotInstance
     * @example
     * // Get one BotInstance
     * const botInstance = await prisma.botInstance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BotInstanceFindFirstArgs>(args?: SelectSubset<T, BotInstanceFindFirstArgs<ExtArgs>>): Prisma__BotInstanceClient<$Result.GetResult<Prisma.$BotInstancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BotInstance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotInstanceFindFirstOrThrowArgs} args - Arguments to find a BotInstance
     * @example
     * // Get one BotInstance
     * const botInstance = await prisma.botInstance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BotInstanceFindFirstOrThrowArgs>(args?: SelectSubset<T, BotInstanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__BotInstanceClient<$Result.GetResult<Prisma.$BotInstancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BotInstances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotInstanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BotInstances
     * const botInstances = await prisma.botInstance.findMany()
     * 
     * // Get first 10 BotInstances
     * const botInstances = await prisma.botInstance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const botInstanceWithIdOnly = await prisma.botInstance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BotInstanceFindManyArgs>(args?: SelectSubset<T, BotInstanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotInstancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BotInstance.
     * @param {BotInstanceCreateArgs} args - Arguments to create a BotInstance.
     * @example
     * // Create one BotInstance
     * const BotInstance = await prisma.botInstance.create({
     *   data: {
     *     // ... data to create a BotInstance
     *   }
     * })
     * 
     */
    create<T extends BotInstanceCreateArgs>(args: SelectSubset<T, BotInstanceCreateArgs<ExtArgs>>): Prisma__BotInstanceClient<$Result.GetResult<Prisma.$BotInstancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BotInstances.
     * @param {BotInstanceCreateManyArgs} args - Arguments to create many BotInstances.
     * @example
     * // Create many BotInstances
     * const botInstance = await prisma.botInstance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BotInstanceCreateManyArgs>(args?: SelectSubset<T, BotInstanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BotInstances and returns the data saved in the database.
     * @param {BotInstanceCreateManyAndReturnArgs} args - Arguments to create many BotInstances.
     * @example
     * // Create many BotInstances
     * const botInstance = await prisma.botInstance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BotInstances and only return the `id`
     * const botInstanceWithIdOnly = await prisma.botInstance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BotInstanceCreateManyAndReturnArgs>(args?: SelectSubset<T, BotInstanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotInstancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BotInstance.
     * @param {BotInstanceDeleteArgs} args - Arguments to delete one BotInstance.
     * @example
     * // Delete one BotInstance
     * const BotInstance = await prisma.botInstance.delete({
     *   where: {
     *     // ... filter to delete one BotInstance
     *   }
     * })
     * 
     */
    delete<T extends BotInstanceDeleteArgs>(args: SelectSubset<T, BotInstanceDeleteArgs<ExtArgs>>): Prisma__BotInstanceClient<$Result.GetResult<Prisma.$BotInstancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BotInstance.
     * @param {BotInstanceUpdateArgs} args - Arguments to update one BotInstance.
     * @example
     * // Update one BotInstance
     * const botInstance = await prisma.botInstance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BotInstanceUpdateArgs>(args: SelectSubset<T, BotInstanceUpdateArgs<ExtArgs>>): Prisma__BotInstanceClient<$Result.GetResult<Prisma.$BotInstancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BotInstances.
     * @param {BotInstanceDeleteManyArgs} args - Arguments to filter BotInstances to delete.
     * @example
     * // Delete a few BotInstances
     * const { count } = await prisma.botInstance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BotInstanceDeleteManyArgs>(args?: SelectSubset<T, BotInstanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BotInstances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotInstanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BotInstances
     * const botInstance = await prisma.botInstance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BotInstanceUpdateManyArgs>(args: SelectSubset<T, BotInstanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BotInstances and returns the data updated in the database.
     * @param {BotInstanceUpdateManyAndReturnArgs} args - Arguments to update many BotInstances.
     * @example
     * // Update many BotInstances
     * const botInstance = await prisma.botInstance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BotInstances and only return the `id`
     * const botInstanceWithIdOnly = await prisma.botInstance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BotInstanceUpdateManyAndReturnArgs>(args: SelectSubset<T, BotInstanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BotInstancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BotInstance.
     * @param {BotInstanceUpsertArgs} args - Arguments to update or create a BotInstance.
     * @example
     * // Update or create a BotInstance
     * const botInstance = await prisma.botInstance.upsert({
     *   create: {
     *     // ... data to create a BotInstance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BotInstance we want to update
     *   }
     * })
     */
    upsert<T extends BotInstanceUpsertArgs>(args: SelectSubset<T, BotInstanceUpsertArgs<ExtArgs>>): Prisma__BotInstanceClient<$Result.GetResult<Prisma.$BotInstancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BotInstances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotInstanceCountArgs} args - Arguments to filter BotInstances to count.
     * @example
     * // Count the number of BotInstances
     * const count = await prisma.botInstance.count({
     *   where: {
     *     // ... the filter for the BotInstances we want to count
     *   }
     * })
    **/
    count<T extends BotInstanceCountArgs>(
      args?: Subset<T, BotInstanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BotInstanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BotInstance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotInstanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BotInstanceAggregateArgs>(args: Subset<T, BotInstanceAggregateArgs>): Prisma.PrismaPromise<GetBotInstanceAggregateType<T>>

    /**
     * Group by BotInstance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BotInstanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BotInstanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BotInstanceGroupByArgs['orderBy'] }
        : { orderBy?: BotInstanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BotInstanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBotInstanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BotInstance model
   */
  readonly fields: BotInstanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BotInstance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BotInstanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BotInstance model
   */
  interface BotInstanceFieldRefs {
    readonly id: FieldRef<"BotInstance", 'String'>
    readonly userId: FieldRef<"BotInstance", 'String'>
    readonly botToken: FieldRef<"BotInstance", 'String'>
    readonly applicationId: FieldRef<"BotInstance", 'String'>
    readonly botName: FieldRef<"BotInstance", 'String'>
    readonly botStatus: FieldRef<"BotInstance", 'String'>
    readonly botActivity: FieldRef<"BotInstance", 'String'>
    readonly isActive: FieldRef<"BotInstance", 'Boolean'>
    readonly pm2ProcessId: FieldRef<"BotInstance", 'String'>
    readonly defaultVolume: FieldRef<"BotInstance", 'Int'>
    readonly enable247: FieldRef<"BotInstance", 'Boolean'>
    readonly enableAutoplay: FieldRef<"BotInstance", 'Boolean'>
    readonly createdAt: FieldRef<"BotInstance", 'DateTime'>
    readonly updatedAt: FieldRef<"BotInstance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BotInstance findUnique
   */
  export type BotInstanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotInstance
     */
    select?: BotInstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotInstance
     */
    omit?: BotInstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInstanceInclude<ExtArgs> | null
    /**
     * Filter, which BotInstance to fetch.
     */
    where: BotInstanceWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BotInstance findUniqueOrThrow
   */
  export type BotInstanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotInstance
     */
    select?: BotInstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotInstance
     */
    omit?: BotInstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInstanceInclude<ExtArgs> | null
    /**
     * Filter, which BotInstance to fetch.
     */
    where: BotInstanceWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BotInstance findFirst
   */
  export type BotInstanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotInstance
     */
    select?: BotInstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotInstance
     */
    omit?: BotInstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInstanceInclude<ExtArgs> | null
    /**
     * Filter, which BotInstance to fetch.
     */
    where?: BotInstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BotInstances to fetch.
     */
    orderBy?: BotInstanceOrderByWithRelationInput | BotInstanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BotInstances.
     */
    cursor?: BotInstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BotInstances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BotInstances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BotInstances.
     */
    distinct?: BotInstanceScalarFieldEnum | BotInstanceScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BotInstance findFirstOrThrow
   */
  export type BotInstanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotInstance
     */
    select?: BotInstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotInstance
     */
    omit?: BotInstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInstanceInclude<ExtArgs> | null
    /**
     * Filter, which BotInstance to fetch.
     */
    where?: BotInstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BotInstances to fetch.
     */
    orderBy?: BotInstanceOrderByWithRelationInput | BotInstanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BotInstances.
     */
    cursor?: BotInstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BotInstances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BotInstances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BotInstances.
     */
    distinct?: BotInstanceScalarFieldEnum | BotInstanceScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BotInstance findMany
   */
  export type BotInstanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotInstance
     */
    select?: BotInstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotInstance
     */
    omit?: BotInstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInstanceInclude<ExtArgs> | null
    /**
     * Filter, which BotInstances to fetch.
     */
    where?: BotInstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BotInstances to fetch.
     */
    orderBy?: BotInstanceOrderByWithRelationInput | BotInstanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BotInstances.
     */
    cursor?: BotInstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BotInstances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BotInstances.
     */
    skip?: number
    distinct?: BotInstanceScalarFieldEnum | BotInstanceScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BotInstance create
   */
  export type BotInstanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotInstance
     */
    select?: BotInstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotInstance
     */
    omit?: BotInstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInstanceInclude<ExtArgs> | null
    /**
     * The data needed to create a BotInstance.
     */
    data: XOR<BotInstanceCreateInput, BotInstanceUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BotInstance createMany
   */
  export type BotInstanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BotInstances.
     */
    data: BotInstanceCreateManyInput | BotInstanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BotInstance createManyAndReturn
   */
  export type BotInstanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotInstance
     */
    select?: BotInstanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BotInstance
     */
    omit?: BotInstanceOmit<ExtArgs> | null
    /**
     * The data used to create many BotInstances.
     */
    data: BotInstanceCreateManyInput | BotInstanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInstanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BotInstance update
   */
  export type BotInstanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotInstance
     */
    select?: BotInstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotInstance
     */
    omit?: BotInstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInstanceInclude<ExtArgs> | null
    /**
     * The data needed to update a BotInstance.
     */
    data: XOR<BotInstanceUpdateInput, BotInstanceUncheckedUpdateInput>
    /**
     * Choose, which BotInstance to update.
     */
    where: BotInstanceWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BotInstance updateMany
   */
  export type BotInstanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BotInstances.
     */
    data: XOR<BotInstanceUpdateManyMutationInput, BotInstanceUncheckedUpdateManyInput>
    /**
     * Filter which BotInstances to update
     */
    where?: BotInstanceWhereInput
    /**
     * Limit how many BotInstances to update.
     */
    limit?: number
  }

  /**
   * BotInstance updateManyAndReturn
   */
  export type BotInstanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotInstance
     */
    select?: BotInstanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BotInstance
     */
    omit?: BotInstanceOmit<ExtArgs> | null
    /**
     * The data used to update BotInstances.
     */
    data: XOR<BotInstanceUpdateManyMutationInput, BotInstanceUncheckedUpdateManyInput>
    /**
     * Filter which BotInstances to update
     */
    where?: BotInstanceWhereInput
    /**
     * Limit how many BotInstances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInstanceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BotInstance upsert
   */
  export type BotInstanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotInstance
     */
    select?: BotInstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotInstance
     */
    omit?: BotInstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInstanceInclude<ExtArgs> | null
    /**
     * The filter to search for the BotInstance to update in case it exists.
     */
    where: BotInstanceWhereUniqueInput
    /**
     * In case the BotInstance found by the `where` argument doesn't exist, create a new BotInstance with this data.
     */
    create: XOR<BotInstanceCreateInput, BotInstanceUncheckedCreateInput>
    /**
     * In case the BotInstance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BotInstanceUpdateInput, BotInstanceUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BotInstance delete
   */
  export type BotInstanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotInstance
     */
    select?: BotInstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotInstance
     */
    omit?: BotInstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInstanceInclude<ExtArgs> | null
    /**
     * Filter which BotInstance to delete.
     */
    where: BotInstanceWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * BotInstance deleteMany
   */
  export type BotInstanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BotInstances to delete
     */
    where?: BotInstanceWhereInput
    /**
     * Limit how many BotInstances to delete.
     */
    limit?: number
  }

  /**
   * BotInstance without action
   */
  export type BotInstanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BotInstance
     */
    select?: BotInstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BotInstance
     */
    omit?: BotInstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BotInstanceInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: number | null
    duration: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: number | null
    duration: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    planId: string | null
    stripeSessionId: string | null
    transactionId: string | null
    amount: number | null
    currency: string | null
    paymentMethod: string | null
    status: string | null
    duration: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    planId: string | null
    stripeSessionId: string | null
    transactionId: string | null
    amount: number | null
    currency: string | null
    paymentMethod: string | null
    status: string | null
    duration: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    userId: number
    planId: number
    stripeSessionId: number
    transactionId: number
    amount: number
    currency: number
    paymentMethod: number
    status: number
    duration: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
    duration?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
    duration?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    userId?: true
    planId?: true
    stripeSessionId?: true
    transactionId?: true
    amount?: true
    currency?: true
    paymentMethod?: true
    status?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    userId?: true
    planId?: true
    stripeSessionId?: true
    transactionId?: true
    amount?: true
    currency?: true
    paymentMethod?: true
    status?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    userId?: true
    planId?: true
    stripeSessionId?: true
    transactionId?: true
    amount?: true
    currency?: true
    paymentMethod?: true
    status?: true
    duration?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    userId: string
    planId: string | null
    stripeSessionId: string | null
    transactionId: string | null
    amount: number
    currency: string
    paymentMethod: string
    status: string
    duration: number
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    planId?: boolean
    stripeSessionId?: boolean
    transactionId?: boolean
    amount?: boolean
    currency?: boolean
    paymentMethod?: boolean
    status?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    plan?: boolean | Payment$planArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    planId?: boolean
    stripeSessionId?: boolean
    transactionId?: boolean
    amount?: boolean
    currency?: boolean
    paymentMethod?: boolean
    status?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    plan?: boolean | Payment$planArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    planId?: boolean
    stripeSessionId?: boolean
    transactionId?: boolean
    amount?: boolean
    currency?: boolean
    paymentMethod?: boolean
    status?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    plan?: boolean | Payment$planArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    userId?: boolean
    planId?: boolean
    stripeSessionId?: boolean
    transactionId?: boolean
    amount?: boolean
    currency?: boolean
    paymentMethod?: boolean
    status?: boolean
    duration?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "planId" | "stripeSessionId" | "transactionId" | "amount" | "currency" | "paymentMethod" | "status" | "duration" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    plan?: boolean | Payment$planArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    plan?: boolean | Payment$planArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    plan?: boolean | Payment$planArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      plan: Prisma.$PlanPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      planId: string | null
      stripeSessionId: string | null
      transactionId: string | null
      amount: number
      currency: string
      paymentMethod: string
      status: string
      duration: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    plan<T extends Payment$planArgs<ExtArgs> = {}>(args?: Subset<T, Payment$planArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly userId: FieldRef<"Payment", 'String'>
    readonly planId: FieldRef<"Payment", 'String'>
    readonly stripeSessionId: FieldRef<"Payment", 'String'>
    readonly transactionId: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Float'>
    readonly currency: FieldRef<"Payment", 'String'>
    readonly paymentMethod: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'String'>
    readonly duration: FieldRef<"Payment", 'Int'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment.plan
   */
  export type Payment$planArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    where?: PlanWhereInput
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model Plan
   */

  export type AggregatePlan = {
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  export type PlanAvgAggregateOutputType = {
    price: number | null
    durationDays: number | null
  }

  export type PlanSumAggregateOutputType = {
    price: number | null
    durationDays: number | null
  }

  export type PlanMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    price: number | null
    currency: string | null
    durationDays: number | null
    isActive: boolean | null
    stripePriceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    price: number | null
    currency: string | null
    durationDays: number | null
    isActive: boolean | null
    stripePriceId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanCountAggregateOutputType = {
    id: number
    name: number
    description: number
    price: number
    currency: number
    durationDays: number
    features: number
    isActive: number
    stripePriceId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlanAvgAggregateInputType = {
    price?: true
    durationDays?: true
  }

  export type PlanSumAggregateInputType = {
    price?: true
    durationDays?: true
  }

  export type PlanMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    currency?: true
    durationDays?: true
    isActive?: true
    stripePriceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    currency?: true
    durationDays?: true
    isActive?: true
    stripePriceId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    currency?: true
    durationDays?: true
    features?: true
    isActive?: true
    stripePriceId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plan to aggregate.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Plans
    **/
    _count?: true | PlanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanMaxAggregateInputType
  }

  export type GetPlanAggregateType<T extends PlanAggregateArgs> = {
        [P in keyof T & keyof AggregatePlan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlan[P]>
      : GetScalarType<T[P], AggregatePlan[P]>
  }




  export type PlanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanWhereInput
    orderBy?: PlanOrderByWithAggregationInput | PlanOrderByWithAggregationInput[]
    by: PlanScalarFieldEnum[] | PlanScalarFieldEnum
    having?: PlanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanCountAggregateInputType | true
    _avg?: PlanAvgAggregateInputType
    _sum?: PlanSumAggregateInputType
    _min?: PlanMinAggregateInputType
    _max?: PlanMaxAggregateInputType
  }

  export type PlanGroupByOutputType = {
    id: string
    name: string
    description: string | null
    price: number
    currency: string
    durationDays: number
    features: string[]
    isActive: boolean
    stripePriceId: string | null
    createdAt: Date
    updatedAt: Date
    _count: PlanCountAggregateOutputType | null
    _avg: PlanAvgAggregateOutputType | null
    _sum: PlanSumAggregateOutputType | null
    _min: PlanMinAggregateOutputType | null
    _max: PlanMaxAggregateOutputType | null
  }

  type GetPlanGroupByPayload<T extends PlanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanGroupByOutputType[P]>
            : GetScalarType<T[P], PlanGroupByOutputType[P]>
        }
      >
    >


  export type PlanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    currency?: boolean
    durationDays?: boolean
    features?: boolean
    isActive?: boolean
    stripePriceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    payments?: boolean | Plan$paymentsArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    currency?: boolean
    durationDays?: boolean
    features?: boolean
    isActive?: boolean
    stripePriceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    currency?: boolean
    durationDays?: boolean
    features?: boolean
    isActive?: boolean
    stripePriceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["plan"]>

  export type PlanSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    currency?: boolean
    durationDays?: boolean
    features?: boolean
    isActive?: boolean
    stripePriceId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "price" | "currency" | "durationDays" | "features" | "isActive" | "stripePriceId" | "createdAt" | "updatedAt", ExtArgs["result"]["plan"]>
  export type PlanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    payments?: boolean | Plan$paymentsArgs<ExtArgs>
    _count?: boolean | PlanCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PlanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PlanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Plan"
    objects: {
      payments: Prisma.$PaymentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      price: number
      currency: string
      durationDays: number
      features: string[]
      isActive: boolean
      stripePriceId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["plan"]>
    composites: {}
  }

  type PlanGetPayload<S extends boolean | null | undefined | PlanDefaultArgs> = $Result.GetResult<Prisma.$PlanPayload, S>

  type PlanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: PlanCountAggregateInputType | true
    }

  export interface PlanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Plan'], meta: { name: 'Plan' } }
    /**
     * Find zero or one Plan that matches the filter.
     * @param {PlanFindUniqueArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanFindUniqueArgs>(args: SelectSubset<T, PlanFindUniqueArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Plan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanFindUniqueOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanFindFirstArgs>(args?: SelectSubset<T, PlanFindFirstArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Plan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindFirstOrThrowArgs} args - Arguments to find a Plan
     * @example
     * // Get one Plan
     * const plan = await prisma.plan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Plans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Plans
     * const plans = await prisma.plan.findMany()
     * 
     * // Get first 10 Plans
     * const plans = await prisma.plan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planWithIdOnly = await prisma.plan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanFindManyArgs>(args?: SelectSubset<T, PlanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Plan.
     * @param {PlanCreateArgs} args - Arguments to create a Plan.
     * @example
     * // Create one Plan
     * const Plan = await prisma.plan.create({
     *   data: {
     *     // ... data to create a Plan
     *   }
     * })
     * 
     */
    create<T extends PlanCreateArgs>(args: SelectSubset<T, PlanCreateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Plans.
     * @param {PlanCreateManyArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanCreateManyArgs>(args?: SelectSubset<T, PlanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Plans and returns the data saved in the database.
     * @param {PlanCreateManyAndReturnArgs} args - Arguments to create many Plans.
     * @example
     * // Create many Plans
     * const plan = await prisma.plan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Plan.
     * @param {PlanDeleteArgs} args - Arguments to delete one Plan.
     * @example
     * // Delete one Plan
     * const Plan = await prisma.plan.delete({
     *   where: {
     *     // ... filter to delete one Plan
     *   }
     * })
     * 
     */
    delete<T extends PlanDeleteArgs>(args: SelectSubset<T, PlanDeleteArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Plan.
     * @param {PlanUpdateArgs} args - Arguments to update one Plan.
     * @example
     * // Update one Plan
     * const plan = await prisma.plan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanUpdateArgs>(args: SelectSubset<T, PlanUpdateArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Plans.
     * @param {PlanDeleteManyArgs} args - Arguments to filter Plans to delete.
     * @example
     * // Delete a few Plans
     * const { count } = await prisma.plan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanDeleteManyArgs>(args?: SelectSubset<T, PlanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanUpdateManyArgs>(args: SelectSubset<T, PlanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Plans and returns the data updated in the database.
     * @param {PlanUpdateManyAndReturnArgs} args - Arguments to update many Plans.
     * @example
     * // Update many Plans
     * const plan = await prisma.plan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Plans and only return the `id`
     * const planWithIdOnly = await prisma.plan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlanUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Plan.
     * @param {PlanUpsertArgs} args - Arguments to update or create a Plan.
     * @example
     * // Update or create a Plan
     * const plan = await prisma.plan.upsert({
     *   create: {
     *     // ... data to create a Plan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Plan we want to update
     *   }
     * })
     */
    upsert<T extends PlanUpsertArgs>(args: SelectSubset<T, PlanUpsertArgs<ExtArgs>>): Prisma__PlanClient<$Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Plans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCountArgs} args - Arguments to filter Plans to count.
     * @example
     * // Count the number of Plans
     * const count = await prisma.plan.count({
     *   where: {
     *     // ... the filter for the Plans we want to count
     *   }
     * })
    **/
    count<T extends PlanCountArgs>(
      args?: Subset<T, PlanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanAggregateArgs>(args: Subset<T, PlanAggregateArgs>): Prisma.PrismaPromise<GetPlanAggregateType<T>>

    /**
     * Group by Plan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanGroupByArgs['orderBy'] }
        : { orderBy?: PlanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Plan model
   */
  readonly fields: PlanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Plan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    payments<T extends Plan$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Plan$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Plan model
   */
  interface PlanFieldRefs {
    readonly id: FieldRef<"Plan", 'String'>
    readonly name: FieldRef<"Plan", 'String'>
    readonly description: FieldRef<"Plan", 'String'>
    readonly price: FieldRef<"Plan", 'Float'>
    readonly currency: FieldRef<"Plan", 'String'>
    readonly durationDays: FieldRef<"Plan", 'Int'>
    readonly features: FieldRef<"Plan", 'String[]'>
    readonly isActive: FieldRef<"Plan", 'Boolean'>
    readonly stripePriceId: FieldRef<"Plan", 'String'>
    readonly createdAt: FieldRef<"Plan", 'DateTime'>
    readonly updatedAt: FieldRef<"Plan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Plan findUnique
   */
  export type PlanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Plan findUniqueOrThrow
   */
  export type PlanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where: PlanWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Plan findFirst
   */
  export type PlanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Plan findFirstOrThrow
   */
  export type PlanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plan to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Plans.
     */
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Plan findMany
   */
  export type PlanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter, which Plans to fetch.
     */
    where?: PlanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Plans to fetch.
     */
    orderBy?: PlanOrderByWithRelationInput | PlanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Plans.
     */
    cursor?: PlanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Plans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Plans.
     */
    skip?: number
    distinct?: PlanScalarFieldEnum | PlanScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Plan create
   */
  export type PlanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to create a Plan.
     */
    data: XOR<PlanCreateInput, PlanUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Plan createMany
   */
  export type PlanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan createManyAndReturn
   */
  export type PlanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to create many Plans.
     */
    data: PlanCreateManyInput | PlanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Plan update
   */
  export type PlanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The data needed to update a Plan.
     */
    data: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
    /**
     * Choose, which Plan to update.
     */
    where: PlanWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Plan updateMany
   */
  export type PlanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan updateManyAndReturn
   */
  export type PlanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * The data used to update Plans.
     */
    data: XOR<PlanUpdateManyMutationInput, PlanUncheckedUpdateManyInput>
    /**
     * Filter which Plans to update
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to update.
     */
    limit?: number
  }

  /**
   * Plan upsert
   */
  export type PlanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * The filter to search for the Plan to update in case it exists.
     */
    where: PlanWhereUniqueInput
    /**
     * In case the Plan found by the `where` argument doesn't exist, create a new Plan with this data.
     */
    create: XOR<PlanCreateInput, PlanUncheckedCreateInput>
    /**
     * In case the Plan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanUpdateInput, PlanUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Plan delete
   */
  export type PlanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
    /**
     * Filter which Plan to delete.
     */
    where: PlanWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Plan deleteMany
   */
  export type PlanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Plans to delete
     */
    where?: PlanWhereInput
    /**
     * Limit how many Plans to delete.
     */
    limit?: number
  }

  /**
   * Plan.payments
   */
  export type Plan$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Plan without action
   */
  export type PlanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Plan
     */
    select?: PlanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Plan
     */
    omit?: PlanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlanInclude<ExtArgs> | null
  }


  /**
   * Model GuildOwner
   */

  export type AggregateGuildOwner = {
    _count: GuildOwnerCountAggregateOutputType | null
    _min: GuildOwnerMinAggregateOutputType | null
    _max: GuildOwnerMaxAggregateOutputType | null
  }

  export type GuildOwnerMinAggregateOutputType = {
    userId: string | null
    guildId: string | null
  }

  export type GuildOwnerMaxAggregateOutputType = {
    userId: string | null
    guildId: string | null
  }

  export type GuildOwnerCountAggregateOutputType = {
    userId: number
    guildId: number
    _all: number
  }


  export type GuildOwnerMinAggregateInputType = {
    userId?: true
    guildId?: true
  }

  export type GuildOwnerMaxAggregateInputType = {
    userId?: true
    guildId?: true
  }

  export type GuildOwnerCountAggregateInputType = {
    userId?: true
    guildId?: true
    _all?: true
  }

  export type GuildOwnerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuildOwner to aggregate.
     */
    where?: GuildOwnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildOwners to fetch.
     */
    orderBy?: GuildOwnerOrderByWithRelationInput | GuildOwnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GuildOwnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildOwners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildOwners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GuildOwners
    **/
    _count?: true | GuildOwnerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GuildOwnerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GuildOwnerMaxAggregateInputType
  }

  export type GetGuildOwnerAggregateType<T extends GuildOwnerAggregateArgs> = {
        [P in keyof T & keyof AggregateGuildOwner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGuildOwner[P]>
      : GetScalarType<T[P], AggregateGuildOwner[P]>
  }




  export type GuildOwnerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GuildOwnerWhereInput
    orderBy?: GuildOwnerOrderByWithAggregationInput | GuildOwnerOrderByWithAggregationInput[]
    by: GuildOwnerScalarFieldEnum[] | GuildOwnerScalarFieldEnum
    having?: GuildOwnerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GuildOwnerCountAggregateInputType | true
    _min?: GuildOwnerMinAggregateInputType
    _max?: GuildOwnerMaxAggregateInputType
  }

  export type GuildOwnerGroupByOutputType = {
    userId: string
    guildId: string
    _count: GuildOwnerCountAggregateOutputType | null
    _min: GuildOwnerMinAggregateOutputType | null
    _max: GuildOwnerMaxAggregateOutputType | null
  }

  type GetGuildOwnerGroupByPayload<T extends GuildOwnerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GuildOwnerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GuildOwnerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GuildOwnerGroupByOutputType[P]>
            : GetScalarType<T[P], GuildOwnerGroupByOutputType[P]>
        }
      >
    >


  export type GuildOwnerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    guildId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guildOwner"]>

  export type GuildOwnerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    guildId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guildOwner"]>

  export type GuildOwnerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    guildId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["guildOwner"]>

  export type GuildOwnerSelectScalar = {
    userId?: boolean
    guildId?: boolean
  }

  export type GuildOwnerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "guildId", ExtArgs["result"]["guildOwner"]>
  export type GuildOwnerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GuildOwnerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type GuildOwnerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $GuildOwnerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GuildOwner"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string
      guildId: string
    }, ExtArgs["result"]["guildOwner"]>
    composites: {}
  }

  type GuildOwnerGetPayload<S extends boolean | null | undefined | GuildOwnerDefaultArgs> = $Result.GetResult<Prisma.$GuildOwnerPayload, S>

  type GuildOwnerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GuildOwnerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: GuildOwnerCountAggregateInputType | true
    }

  export interface GuildOwnerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GuildOwner'], meta: { name: 'GuildOwner' } }
    /**
     * Find zero or one GuildOwner that matches the filter.
     * @param {GuildOwnerFindUniqueArgs} args - Arguments to find a GuildOwner
     * @example
     * // Get one GuildOwner
     * const guildOwner = await prisma.guildOwner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GuildOwnerFindUniqueArgs>(args: SelectSubset<T, GuildOwnerFindUniqueArgs<ExtArgs>>): Prisma__GuildOwnerClient<$Result.GetResult<Prisma.$GuildOwnerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GuildOwner that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GuildOwnerFindUniqueOrThrowArgs} args - Arguments to find a GuildOwner
     * @example
     * // Get one GuildOwner
     * const guildOwner = await prisma.guildOwner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GuildOwnerFindUniqueOrThrowArgs>(args: SelectSubset<T, GuildOwnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GuildOwnerClient<$Result.GetResult<Prisma.$GuildOwnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GuildOwner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildOwnerFindFirstArgs} args - Arguments to find a GuildOwner
     * @example
     * // Get one GuildOwner
     * const guildOwner = await prisma.guildOwner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GuildOwnerFindFirstArgs>(args?: SelectSubset<T, GuildOwnerFindFirstArgs<ExtArgs>>): Prisma__GuildOwnerClient<$Result.GetResult<Prisma.$GuildOwnerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GuildOwner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildOwnerFindFirstOrThrowArgs} args - Arguments to find a GuildOwner
     * @example
     * // Get one GuildOwner
     * const guildOwner = await prisma.guildOwner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GuildOwnerFindFirstOrThrowArgs>(args?: SelectSubset<T, GuildOwnerFindFirstOrThrowArgs<ExtArgs>>): Prisma__GuildOwnerClient<$Result.GetResult<Prisma.$GuildOwnerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GuildOwners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildOwnerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GuildOwners
     * const guildOwners = await prisma.guildOwner.findMany()
     * 
     * // Get first 10 GuildOwners
     * const guildOwners = await prisma.guildOwner.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const guildOwnerWithUserIdOnly = await prisma.guildOwner.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends GuildOwnerFindManyArgs>(args?: SelectSubset<T, GuildOwnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildOwnerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GuildOwner.
     * @param {GuildOwnerCreateArgs} args - Arguments to create a GuildOwner.
     * @example
     * // Create one GuildOwner
     * const GuildOwner = await prisma.guildOwner.create({
     *   data: {
     *     // ... data to create a GuildOwner
     *   }
     * })
     * 
     */
    create<T extends GuildOwnerCreateArgs>(args: SelectSubset<T, GuildOwnerCreateArgs<ExtArgs>>): Prisma__GuildOwnerClient<$Result.GetResult<Prisma.$GuildOwnerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GuildOwners.
     * @param {GuildOwnerCreateManyArgs} args - Arguments to create many GuildOwners.
     * @example
     * // Create many GuildOwners
     * const guildOwner = await prisma.guildOwner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GuildOwnerCreateManyArgs>(args?: SelectSubset<T, GuildOwnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GuildOwners and returns the data saved in the database.
     * @param {GuildOwnerCreateManyAndReturnArgs} args - Arguments to create many GuildOwners.
     * @example
     * // Create many GuildOwners
     * const guildOwner = await prisma.guildOwner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GuildOwners and only return the `userId`
     * const guildOwnerWithUserIdOnly = await prisma.guildOwner.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GuildOwnerCreateManyAndReturnArgs>(args?: SelectSubset<T, GuildOwnerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildOwnerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GuildOwner.
     * @param {GuildOwnerDeleteArgs} args - Arguments to delete one GuildOwner.
     * @example
     * // Delete one GuildOwner
     * const GuildOwner = await prisma.guildOwner.delete({
     *   where: {
     *     // ... filter to delete one GuildOwner
     *   }
     * })
     * 
     */
    delete<T extends GuildOwnerDeleteArgs>(args: SelectSubset<T, GuildOwnerDeleteArgs<ExtArgs>>): Prisma__GuildOwnerClient<$Result.GetResult<Prisma.$GuildOwnerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GuildOwner.
     * @param {GuildOwnerUpdateArgs} args - Arguments to update one GuildOwner.
     * @example
     * // Update one GuildOwner
     * const guildOwner = await prisma.guildOwner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GuildOwnerUpdateArgs>(args: SelectSubset<T, GuildOwnerUpdateArgs<ExtArgs>>): Prisma__GuildOwnerClient<$Result.GetResult<Prisma.$GuildOwnerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GuildOwners.
     * @param {GuildOwnerDeleteManyArgs} args - Arguments to filter GuildOwners to delete.
     * @example
     * // Delete a few GuildOwners
     * const { count } = await prisma.guildOwner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GuildOwnerDeleteManyArgs>(args?: SelectSubset<T, GuildOwnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuildOwners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildOwnerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GuildOwners
     * const guildOwner = await prisma.guildOwner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GuildOwnerUpdateManyArgs>(args: SelectSubset<T, GuildOwnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GuildOwners and returns the data updated in the database.
     * @param {GuildOwnerUpdateManyAndReturnArgs} args - Arguments to update many GuildOwners.
     * @example
     * // Update many GuildOwners
     * const guildOwner = await prisma.guildOwner.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GuildOwners and only return the `userId`
     * const guildOwnerWithUserIdOnly = await prisma.guildOwner.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GuildOwnerUpdateManyAndReturnArgs>(args: SelectSubset<T, GuildOwnerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GuildOwnerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GuildOwner.
     * @param {GuildOwnerUpsertArgs} args - Arguments to update or create a GuildOwner.
     * @example
     * // Update or create a GuildOwner
     * const guildOwner = await prisma.guildOwner.upsert({
     *   create: {
     *     // ... data to create a GuildOwner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GuildOwner we want to update
     *   }
     * })
     */
    upsert<T extends GuildOwnerUpsertArgs>(args: SelectSubset<T, GuildOwnerUpsertArgs<ExtArgs>>): Prisma__GuildOwnerClient<$Result.GetResult<Prisma.$GuildOwnerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GuildOwners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildOwnerCountArgs} args - Arguments to filter GuildOwners to count.
     * @example
     * // Count the number of GuildOwners
     * const count = await prisma.guildOwner.count({
     *   where: {
     *     // ... the filter for the GuildOwners we want to count
     *   }
     * })
    **/
    count<T extends GuildOwnerCountArgs>(
      args?: Subset<T, GuildOwnerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GuildOwnerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GuildOwner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildOwnerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GuildOwnerAggregateArgs>(args: Subset<T, GuildOwnerAggregateArgs>): Prisma.PrismaPromise<GetGuildOwnerAggregateType<T>>

    /**
     * Group by GuildOwner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GuildOwnerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GuildOwnerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GuildOwnerGroupByArgs['orderBy'] }
        : { orderBy?: GuildOwnerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GuildOwnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGuildOwnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GuildOwner model
   */
  readonly fields: GuildOwnerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GuildOwner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GuildOwnerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GuildOwner model
   */
  interface GuildOwnerFieldRefs {
    readonly userId: FieldRef<"GuildOwner", 'String'>
    readonly guildId: FieldRef<"GuildOwner", 'String'>
  }
    

  // Custom InputTypes
  /**
   * GuildOwner findUnique
   */
  export type GuildOwnerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildOwner
     */
    select?: GuildOwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildOwner
     */
    omit?: GuildOwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildOwnerInclude<ExtArgs> | null
    /**
     * Filter, which GuildOwner to fetch.
     */
    where: GuildOwnerWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildOwner findUniqueOrThrow
   */
  export type GuildOwnerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildOwner
     */
    select?: GuildOwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildOwner
     */
    omit?: GuildOwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildOwnerInclude<ExtArgs> | null
    /**
     * Filter, which GuildOwner to fetch.
     */
    where: GuildOwnerWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildOwner findFirst
   */
  export type GuildOwnerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildOwner
     */
    select?: GuildOwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildOwner
     */
    omit?: GuildOwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildOwnerInclude<ExtArgs> | null
    /**
     * Filter, which GuildOwner to fetch.
     */
    where?: GuildOwnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildOwners to fetch.
     */
    orderBy?: GuildOwnerOrderByWithRelationInput | GuildOwnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuildOwners.
     */
    cursor?: GuildOwnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildOwners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildOwners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuildOwners.
     */
    distinct?: GuildOwnerScalarFieldEnum | GuildOwnerScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildOwner findFirstOrThrow
   */
  export type GuildOwnerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildOwner
     */
    select?: GuildOwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildOwner
     */
    omit?: GuildOwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildOwnerInclude<ExtArgs> | null
    /**
     * Filter, which GuildOwner to fetch.
     */
    where?: GuildOwnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildOwners to fetch.
     */
    orderBy?: GuildOwnerOrderByWithRelationInput | GuildOwnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GuildOwners.
     */
    cursor?: GuildOwnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildOwners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildOwners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GuildOwners.
     */
    distinct?: GuildOwnerScalarFieldEnum | GuildOwnerScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildOwner findMany
   */
  export type GuildOwnerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildOwner
     */
    select?: GuildOwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildOwner
     */
    omit?: GuildOwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildOwnerInclude<ExtArgs> | null
    /**
     * Filter, which GuildOwners to fetch.
     */
    where?: GuildOwnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GuildOwners to fetch.
     */
    orderBy?: GuildOwnerOrderByWithRelationInput | GuildOwnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GuildOwners.
     */
    cursor?: GuildOwnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GuildOwners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GuildOwners.
     */
    skip?: number
    distinct?: GuildOwnerScalarFieldEnum | GuildOwnerScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildOwner create
   */
  export type GuildOwnerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildOwner
     */
    select?: GuildOwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildOwner
     */
    omit?: GuildOwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildOwnerInclude<ExtArgs> | null
    /**
     * The data needed to create a GuildOwner.
     */
    data: XOR<GuildOwnerCreateInput, GuildOwnerUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildOwner createMany
   */
  export type GuildOwnerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GuildOwners.
     */
    data: GuildOwnerCreateManyInput | GuildOwnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GuildOwner createManyAndReturn
   */
  export type GuildOwnerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildOwner
     */
    select?: GuildOwnerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GuildOwner
     */
    omit?: GuildOwnerOmit<ExtArgs> | null
    /**
     * The data used to create many GuildOwners.
     */
    data: GuildOwnerCreateManyInput | GuildOwnerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildOwnerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GuildOwner update
   */
  export type GuildOwnerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildOwner
     */
    select?: GuildOwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildOwner
     */
    omit?: GuildOwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildOwnerInclude<ExtArgs> | null
    /**
     * The data needed to update a GuildOwner.
     */
    data: XOR<GuildOwnerUpdateInput, GuildOwnerUncheckedUpdateInput>
    /**
     * Choose, which GuildOwner to update.
     */
    where: GuildOwnerWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildOwner updateMany
   */
  export type GuildOwnerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GuildOwners.
     */
    data: XOR<GuildOwnerUpdateManyMutationInput, GuildOwnerUncheckedUpdateManyInput>
    /**
     * Filter which GuildOwners to update
     */
    where?: GuildOwnerWhereInput
    /**
     * Limit how many GuildOwners to update.
     */
    limit?: number
  }

  /**
   * GuildOwner updateManyAndReturn
   */
  export type GuildOwnerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildOwner
     */
    select?: GuildOwnerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GuildOwner
     */
    omit?: GuildOwnerOmit<ExtArgs> | null
    /**
     * The data used to update GuildOwners.
     */
    data: XOR<GuildOwnerUpdateManyMutationInput, GuildOwnerUncheckedUpdateManyInput>
    /**
     * Filter which GuildOwners to update
     */
    where?: GuildOwnerWhereInput
    /**
     * Limit how many GuildOwners to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildOwnerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GuildOwner upsert
   */
  export type GuildOwnerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildOwner
     */
    select?: GuildOwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildOwner
     */
    omit?: GuildOwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildOwnerInclude<ExtArgs> | null
    /**
     * The filter to search for the GuildOwner to update in case it exists.
     */
    where: GuildOwnerWhereUniqueInput
    /**
     * In case the GuildOwner found by the `where` argument doesn't exist, create a new GuildOwner with this data.
     */
    create: XOR<GuildOwnerCreateInput, GuildOwnerUncheckedCreateInput>
    /**
     * In case the GuildOwner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GuildOwnerUpdateInput, GuildOwnerUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildOwner delete
   */
  export type GuildOwnerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildOwner
     */
    select?: GuildOwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildOwner
     */
    omit?: GuildOwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildOwnerInclude<ExtArgs> | null
    /**
     * Filter which GuildOwner to delete.
     */
    where: GuildOwnerWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * GuildOwner deleteMany
   */
  export type GuildOwnerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GuildOwners to delete
     */
    where?: GuildOwnerWhereInput
    /**
     * Limit how many GuildOwners to delete.
     */
    limit?: number
  }

  /**
   * GuildOwner without action
   */
  export type GuildOwnerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GuildOwner
     */
    select?: GuildOwnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GuildOwner
     */
    omit?: GuildOwnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GuildOwnerInclude<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    isRegistered: boolean | null
    isMaster: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLogin: Date | null
  }

  export type AdminMaxAggregateOutputType = {
    id: string | null
    email: string | null
    passwordHash: string | null
    isRegistered: boolean | null
    isMaster: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    lastLogin: Date | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    email: number
    passwordHash: number
    isRegistered: number
    isMaster: number
    permissions: number
    createdAt: number
    updatedAt: number
    lastLogin: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    isRegistered?: true
    isMaster?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    isRegistered?: true
    isMaster?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    email?: true
    passwordHash?: true
    isRegistered?: true
    isMaster?: true
    permissions?: true
    createdAt?: true
    updatedAt?: true
    lastLogin?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: string
    email: string
    passwordHash: string
    isRegistered: boolean
    isMaster: boolean
    permissions: string[]
    createdAt: Date
    updatedAt: Date
    lastLogin: Date | null
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    isRegistered?: boolean
    isMaster?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    isRegistered?: boolean
    isMaster?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    isRegistered?: boolean
    isMaster?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    email?: boolean
    passwordHash?: boolean
    isRegistered?: boolean
    isMaster?: boolean
    permissions?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    lastLogin?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "passwordHash" | "isRegistered" | "isMaster" | "permissions" | "createdAt" | "updatedAt" | "lastLogin", ExtArgs["result"]["admin"]>

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      passwordHash: string
      isRegistered: boolean
      isMaster: boolean
      permissions: string[]
      createdAt: Date
      updatedAt: Date
      lastLogin: Date | null
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'String'>
    readonly email: FieldRef<"Admin", 'String'>
    readonly passwordHash: FieldRef<"Admin", 'String'>
    readonly isRegistered: FieldRef<"Admin", 'Boolean'>
    readonly isMaster: FieldRef<"Admin", 'Boolean'>
    readonly permissions: FieldRef<"Admin", 'String[]'>
    readonly createdAt: FieldRef<"Admin", 'DateTime'>
    readonly updatedAt: FieldRef<"Admin", 'DateTime'>
    readonly lastLogin: FieldRef<"Admin", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
  }


  /**
   * Model OtpVerification
   */

  export type AggregateOtpVerification = {
    _count: OtpVerificationCountAggregateOutputType | null
    _min: OtpVerificationMinAggregateOutputType | null
    _max: OtpVerificationMaxAggregateOutputType | null
  }

  export type OtpVerificationMinAggregateOutputType = {
    id: string | null
    email: string | null
    otp: string | null
    type: string | null
    expiresAt: Date | null
    used: boolean | null
    createdAt: Date | null
  }

  export type OtpVerificationMaxAggregateOutputType = {
    id: string | null
    email: string | null
    otp: string | null
    type: string | null
    expiresAt: Date | null
    used: boolean | null
    createdAt: Date | null
  }

  export type OtpVerificationCountAggregateOutputType = {
    id: number
    email: number
    otp: number
    type: number
    expiresAt: number
    used: number
    createdAt: number
    _all: number
  }


  export type OtpVerificationMinAggregateInputType = {
    id?: true
    email?: true
    otp?: true
    type?: true
    expiresAt?: true
    used?: true
    createdAt?: true
  }

  export type OtpVerificationMaxAggregateInputType = {
    id?: true
    email?: true
    otp?: true
    type?: true
    expiresAt?: true
    used?: true
    createdAt?: true
  }

  export type OtpVerificationCountAggregateInputType = {
    id?: true
    email?: true
    otp?: true
    type?: true
    expiresAt?: true
    used?: true
    createdAt?: true
    _all?: true
  }

  export type OtpVerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpVerification to aggregate.
     */
    where?: OtpVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpVerifications to fetch.
     */
    orderBy?: OtpVerificationOrderByWithRelationInput | OtpVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OtpVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OtpVerifications
    **/
    _count?: true | OtpVerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OtpVerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OtpVerificationMaxAggregateInputType
  }

  export type GetOtpVerificationAggregateType<T extends OtpVerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateOtpVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOtpVerification[P]>
      : GetScalarType<T[P], AggregateOtpVerification[P]>
  }




  export type OtpVerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OtpVerificationWhereInput
    orderBy?: OtpVerificationOrderByWithAggregationInput | OtpVerificationOrderByWithAggregationInput[]
    by: OtpVerificationScalarFieldEnum[] | OtpVerificationScalarFieldEnum
    having?: OtpVerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OtpVerificationCountAggregateInputType | true
    _min?: OtpVerificationMinAggregateInputType
    _max?: OtpVerificationMaxAggregateInputType
  }

  export type OtpVerificationGroupByOutputType = {
    id: string
    email: string
    otp: string
    type: string
    expiresAt: Date
    used: boolean
    createdAt: Date
    _count: OtpVerificationCountAggregateOutputType | null
    _min: OtpVerificationMinAggregateOutputType | null
    _max: OtpVerificationMaxAggregateOutputType | null
  }

  type GetOtpVerificationGroupByPayload<T extends OtpVerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OtpVerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OtpVerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OtpVerificationGroupByOutputType[P]>
            : GetScalarType<T[P], OtpVerificationGroupByOutputType[P]>
        }
      >
    >


  export type OtpVerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    otp?: boolean
    type?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpVerification"]>

  export type OtpVerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    otp?: boolean
    type?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpVerification"]>

  export type OtpVerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    otp?: boolean
    type?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["otpVerification"]>

  export type OtpVerificationSelectScalar = {
    id?: boolean
    email?: boolean
    otp?: boolean
    type?: boolean
    expiresAt?: boolean
    used?: boolean
    createdAt?: boolean
  }

  export type OtpVerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "otp" | "type" | "expiresAt" | "used" | "createdAt", ExtArgs["result"]["otpVerification"]>

  export type $OtpVerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OtpVerification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      otp: string
      type: string
      expiresAt: Date
      used: boolean
      createdAt: Date
    }, ExtArgs["result"]["otpVerification"]>
    composites: {}
  }

  type OtpVerificationGetPayload<S extends boolean | null | undefined | OtpVerificationDefaultArgs> = $Result.GetResult<Prisma.$OtpVerificationPayload, S>

  type OtpVerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OtpVerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit' | 'relationLoadStrategy'> & {
      select?: OtpVerificationCountAggregateInputType | true
    }

  export interface OtpVerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OtpVerification'], meta: { name: 'OtpVerification' } }
    /**
     * Find zero or one OtpVerification that matches the filter.
     * @param {OtpVerificationFindUniqueArgs} args - Arguments to find a OtpVerification
     * @example
     * // Get one OtpVerification
     * const otpVerification = await prisma.otpVerification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OtpVerificationFindUniqueArgs>(args: SelectSubset<T, OtpVerificationFindUniqueArgs<ExtArgs>>): Prisma__OtpVerificationClient<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OtpVerification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OtpVerificationFindUniqueOrThrowArgs} args - Arguments to find a OtpVerification
     * @example
     * // Get one OtpVerification
     * const otpVerification = await prisma.otpVerification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OtpVerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, OtpVerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OtpVerificationClient<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpVerification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationFindFirstArgs} args - Arguments to find a OtpVerification
     * @example
     * // Get one OtpVerification
     * const otpVerification = await prisma.otpVerification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OtpVerificationFindFirstArgs>(args?: SelectSubset<T, OtpVerificationFindFirstArgs<ExtArgs>>): Prisma__OtpVerificationClient<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OtpVerification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationFindFirstOrThrowArgs} args - Arguments to find a OtpVerification
     * @example
     * // Get one OtpVerification
     * const otpVerification = await prisma.otpVerification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OtpVerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, OtpVerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__OtpVerificationClient<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OtpVerifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OtpVerifications
     * const otpVerifications = await prisma.otpVerification.findMany()
     * 
     * // Get first 10 OtpVerifications
     * const otpVerifications = await prisma.otpVerification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const otpVerificationWithIdOnly = await prisma.otpVerification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OtpVerificationFindManyArgs>(args?: SelectSubset<T, OtpVerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OtpVerification.
     * @param {OtpVerificationCreateArgs} args - Arguments to create a OtpVerification.
     * @example
     * // Create one OtpVerification
     * const OtpVerification = await prisma.otpVerification.create({
     *   data: {
     *     // ... data to create a OtpVerification
     *   }
     * })
     * 
     */
    create<T extends OtpVerificationCreateArgs>(args: SelectSubset<T, OtpVerificationCreateArgs<ExtArgs>>): Prisma__OtpVerificationClient<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OtpVerifications.
     * @param {OtpVerificationCreateManyArgs} args - Arguments to create many OtpVerifications.
     * @example
     * // Create many OtpVerifications
     * const otpVerification = await prisma.otpVerification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OtpVerificationCreateManyArgs>(args?: SelectSubset<T, OtpVerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OtpVerifications and returns the data saved in the database.
     * @param {OtpVerificationCreateManyAndReturnArgs} args - Arguments to create many OtpVerifications.
     * @example
     * // Create many OtpVerifications
     * const otpVerification = await prisma.otpVerification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OtpVerifications and only return the `id`
     * const otpVerificationWithIdOnly = await prisma.otpVerification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OtpVerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, OtpVerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OtpVerification.
     * @param {OtpVerificationDeleteArgs} args - Arguments to delete one OtpVerification.
     * @example
     * // Delete one OtpVerification
     * const OtpVerification = await prisma.otpVerification.delete({
     *   where: {
     *     // ... filter to delete one OtpVerification
     *   }
     * })
     * 
     */
    delete<T extends OtpVerificationDeleteArgs>(args: SelectSubset<T, OtpVerificationDeleteArgs<ExtArgs>>): Prisma__OtpVerificationClient<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OtpVerification.
     * @param {OtpVerificationUpdateArgs} args - Arguments to update one OtpVerification.
     * @example
     * // Update one OtpVerification
     * const otpVerification = await prisma.otpVerification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OtpVerificationUpdateArgs>(args: SelectSubset<T, OtpVerificationUpdateArgs<ExtArgs>>): Prisma__OtpVerificationClient<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OtpVerifications.
     * @param {OtpVerificationDeleteManyArgs} args - Arguments to filter OtpVerifications to delete.
     * @example
     * // Delete a few OtpVerifications
     * const { count } = await prisma.otpVerification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OtpVerificationDeleteManyArgs>(args?: SelectSubset<T, OtpVerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OtpVerifications
     * const otpVerification = await prisma.otpVerification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OtpVerificationUpdateManyArgs>(args: SelectSubset<T, OtpVerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OtpVerifications and returns the data updated in the database.
     * @param {OtpVerificationUpdateManyAndReturnArgs} args - Arguments to update many OtpVerifications.
     * @example
     * // Update many OtpVerifications
     * const otpVerification = await prisma.otpVerification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OtpVerifications and only return the `id`
     * const otpVerificationWithIdOnly = await prisma.otpVerification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OtpVerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, OtpVerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OtpVerification.
     * @param {OtpVerificationUpsertArgs} args - Arguments to update or create a OtpVerification.
     * @example
     * // Update or create a OtpVerification
     * const otpVerification = await prisma.otpVerification.upsert({
     *   create: {
     *     // ... data to create a OtpVerification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OtpVerification we want to update
     *   }
     * })
     */
    upsert<T extends OtpVerificationUpsertArgs>(args: SelectSubset<T, OtpVerificationUpsertArgs<ExtArgs>>): Prisma__OtpVerificationClient<$Result.GetResult<Prisma.$OtpVerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OtpVerifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationCountArgs} args - Arguments to filter OtpVerifications to count.
     * @example
     * // Count the number of OtpVerifications
     * const count = await prisma.otpVerification.count({
     *   where: {
     *     // ... the filter for the OtpVerifications we want to count
     *   }
     * })
    **/
    count<T extends OtpVerificationCountArgs>(
      args?: Subset<T, OtpVerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OtpVerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OtpVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OtpVerificationAggregateArgs>(args: Subset<T, OtpVerificationAggregateArgs>): Prisma.PrismaPromise<GetOtpVerificationAggregateType<T>>

    /**
     * Group by OtpVerification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OtpVerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OtpVerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OtpVerificationGroupByArgs['orderBy'] }
        : { orderBy?: OtpVerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OtpVerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOtpVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OtpVerification model
   */
  readonly fields: OtpVerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OtpVerification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OtpVerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OtpVerification model
   */
  interface OtpVerificationFieldRefs {
    readonly id: FieldRef<"OtpVerification", 'String'>
    readonly email: FieldRef<"OtpVerification", 'String'>
    readonly otp: FieldRef<"OtpVerification", 'String'>
    readonly type: FieldRef<"OtpVerification", 'String'>
    readonly expiresAt: FieldRef<"OtpVerification", 'DateTime'>
    readonly used: FieldRef<"OtpVerification", 'Boolean'>
    readonly createdAt: FieldRef<"OtpVerification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OtpVerification findUnique
   */
  export type OtpVerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * Filter, which OtpVerification to fetch.
     */
    where: OtpVerificationWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * OtpVerification findUniqueOrThrow
   */
  export type OtpVerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * Filter, which OtpVerification to fetch.
     */
    where: OtpVerificationWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * OtpVerification findFirst
   */
  export type OtpVerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * Filter, which OtpVerification to fetch.
     */
    where?: OtpVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpVerifications to fetch.
     */
    orderBy?: OtpVerificationOrderByWithRelationInput | OtpVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpVerifications.
     */
    cursor?: OtpVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpVerifications.
     */
    distinct?: OtpVerificationScalarFieldEnum | OtpVerificationScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * OtpVerification findFirstOrThrow
   */
  export type OtpVerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * Filter, which OtpVerification to fetch.
     */
    where?: OtpVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpVerifications to fetch.
     */
    orderBy?: OtpVerificationOrderByWithRelationInput | OtpVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OtpVerifications.
     */
    cursor?: OtpVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpVerifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OtpVerifications.
     */
    distinct?: OtpVerificationScalarFieldEnum | OtpVerificationScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * OtpVerification findMany
   */
  export type OtpVerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * Filter, which OtpVerifications to fetch.
     */
    where?: OtpVerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OtpVerifications to fetch.
     */
    orderBy?: OtpVerificationOrderByWithRelationInput | OtpVerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OtpVerifications.
     */
    cursor?: OtpVerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OtpVerifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OtpVerifications.
     */
    skip?: number
    distinct?: OtpVerificationScalarFieldEnum | OtpVerificationScalarFieldEnum[]
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * OtpVerification create
   */
  export type OtpVerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a OtpVerification.
     */
    data: XOR<OtpVerificationCreateInput, OtpVerificationUncheckedCreateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * OtpVerification createMany
   */
  export type OtpVerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OtpVerifications.
     */
    data: OtpVerificationCreateManyInput | OtpVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpVerification createManyAndReturn
   */
  export type OtpVerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * The data used to create many OtpVerifications.
     */
    data: OtpVerificationCreateManyInput | OtpVerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OtpVerification update
   */
  export type OtpVerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a OtpVerification.
     */
    data: XOR<OtpVerificationUpdateInput, OtpVerificationUncheckedUpdateInput>
    /**
     * Choose, which OtpVerification to update.
     */
    where: OtpVerificationWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * OtpVerification updateMany
   */
  export type OtpVerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OtpVerifications.
     */
    data: XOR<OtpVerificationUpdateManyMutationInput, OtpVerificationUncheckedUpdateManyInput>
    /**
     * Filter which OtpVerifications to update
     */
    where?: OtpVerificationWhereInput
    /**
     * Limit how many OtpVerifications to update.
     */
    limit?: number
  }

  /**
   * OtpVerification updateManyAndReturn
   */
  export type OtpVerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * The data used to update OtpVerifications.
     */
    data: XOR<OtpVerificationUpdateManyMutationInput, OtpVerificationUncheckedUpdateManyInput>
    /**
     * Filter which OtpVerifications to update
     */
    where?: OtpVerificationWhereInput
    /**
     * Limit how many OtpVerifications to update.
     */
    limit?: number
  }

  /**
   * OtpVerification upsert
   */
  export type OtpVerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the OtpVerification to update in case it exists.
     */
    where: OtpVerificationWhereUniqueInput
    /**
     * In case the OtpVerification found by the `where` argument doesn't exist, create a new OtpVerification with this data.
     */
    create: XOR<OtpVerificationCreateInput, OtpVerificationUncheckedCreateInput>
    /**
     * In case the OtpVerification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OtpVerificationUpdateInput, OtpVerificationUncheckedUpdateInput>
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * OtpVerification delete
   */
  export type OtpVerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
    /**
     * Filter which OtpVerification to delete.
     */
    where: OtpVerificationWhereUniqueInput
    relationLoadStrategy?: RelationLoadStrategy
  }

  /**
   * OtpVerification deleteMany
   */
  export type OtpVerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OtpVerifications to delete
     */
    where?: OtpVerificationWhereInput
    /**
     * Limit how many OtpVerifications to delete.
     */
    limit?: number
  }

  /**
   * OtpVerification without action
   */
  export type OtpVerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OtpVerification
     */
    select?: OtpVerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OtpVerification
     */
    omit?: OtpVerificationOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PlaylistScalarFieldEnum: {
    playlist_id: 'playlist_id',
    userId: 'userId',
    name: 'name',
    private: 'private'
  };

  export type PlaylistScalarFieldEnum = (typeof PlaylistScalarFieldEnum)[keyof typeof PlaylistScalarFieldEnum]


  export const RelationLoadStrategy: {
    query: 'query',
    join: 'join'
  };

  export type RelationLoadStrategy = (typeof RelationLoadStrategy)[keyof typeof RelationLoadStrategy]


  export const TrackScalarFieldEnum: {
    track_id: 'track_id',
    uri: 'uri',
    name: 'name',
    encode: 'encode',
    duration: 'duration',
    playlist_id: 'playlist_id'
  };

  export type TrackScalarFieldEnum = (typeof TrackScalarFieldEnum)[keyof typeof TrackScalarFieldEnum]


  export const BotScalarFieldEnum: {
    botId: 'botId',
    voiceId: 'voiceId'
  };

  export type BotScalarFieldEnum = (typeof BotScalarFieldEnum)[keyof typeof BotScalarFieldEnum]


  export const GuildScalarFieldEnum: {
    guildId: 'guildId',
    premiumFrom: 'premiumFrom',
    premiumTo: 'premiumTo',
    premiumPlan: 'premiumPlan',
    language: 'language',
    customBotName: 'customBotName',
    embedColor: 'embedColor',
    defaultVolume: 'defaultVolume',
    enable247: 'enable247',
    enableAutoplay: 'enableAutoplay',
    enableVoteSkip: 'enableVoteSkip',
    isActive: 'isActive',
    lastActivity: 'lastActivity',
    totalCommands: 'totalCommands',
    premiumSlots: 'premiumSlots'
  };

  export type GuildScalarFieldEnum = (typeof GuildScalarFieldEnum)[keyof typeof GuildScalarFieldEnum]


  export const UserScalarFieldEnum: {
    userId: 'userId',
    username: 'username',
    discriminator: 'discriminator',
    avatar: 'avatar',
    email: 'email',
    premiumFrom: 'premiumFrom',
    premiumTo: 'premiumTo',
    premiumPlan: 'premiumPlan',
    premiumPlus: 'premiumPlus',
    stripeCustomerId: 'stripeCustomerId',
    stripeSubscriptionId: 'stripeSubscriptionId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PremiumFeatureScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    price: 'price',
    duration: 'duration',
    features: 'features',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PremiumFeatureScalarFieldEnum = (typeof PremiumFeatureScalarFieldEnum)[keyof typeof PremiumFeatureScalarFieldEnum]


  export const GuildBotSettingsScalarFieldEnum: {
    id: 'id',
    guildId: 'guildId',
    botName: 'botName',
    botAvatar: 'botAvatar',
    embedColor: 'embedColor',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type GuildBotSettingsScalarFieldEnum = (typeof GuildBotSettingsScalarFieldEnum)[keyof typeof GuildBotSettingsScalarFieldEnum]


  export const BotInstanceScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    botToken: 'botToken',
    applicationId: 'applicationId',
    botName: 'botName',
    botStatus: 'botStatus',
    botActivity: 'botActivity',
    isActive: 'isActive',
    pm2ProcessId: 'pm2ProcessId',
    defaultVolume: 'defaultVolume',
    enable247: 'enable247',
    enableAutoplay: 'enableAutoplay',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BotInstanceScalarFieldEnum = (typeof BotInstanceScalarFieldEnum)[keyof typeof BotInstanceScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    planId: 'planId',
    stripeSessionId: 'stripeSessionId',
    transactionId: 'transactionId',
    amount: 'amount',
    currency: 'currency',
    paymentMethod: 'paymentMethod',
    status: 'status',
    duration: 'duration',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const PlanScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    price: 'price',
    currency: 'currency',
    durationDays: 'durationDays',
    features: 'features',
    isActive: 'isActive',
    stripePriceId: 'stripePriceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlanScalarFieldEnum = (typeof PlanScalarFieldEnum)[keyof typeof PlanScalarFieldEnum]


  export const GuildOwnerScalarFieldEnum: {
    userId: 'userId',
    guildId: 'guildId'
  };

  export type GuildOwnerScalarFieldEnum = (typeof GuildOwnerScalarFieldEnum)[keyof typeof GuildOwnerScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    email: 'email',
    passwordHash: 'passwordHash',
    isRegistered: 'isRegistered',
    isMaster: 'isMaster',
    permissions: 'permissions',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    lastLogin: 'lastLogin'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const OtpVerificationScalarFieldEnum: {
    id: 'id',
    email: 'email',
    otp: 'otp',
    type: 'type',
    expiresAt: 'expiresAt',
    used: 'used',
    createdAt: 'createdAt'
  };

  export type OtpVerificationScalarFieldEnum = (typeof OtpVerificationScalarFieldEnum)[keyof typeof OtpVerificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'PremiumPlan'
   */
  export type EnumPremiumPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PremiumPlan'>
    


  /**
   * Reference to a field of type 'PremiumPlan[]'
   */
  export type ListEnumPremiumPlanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PremiumPlan[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PlaylistWhereInput = {
    AND?: PlaylistWhereInput | PlaylistWhereInput[]
    OR?: PlaylistWhereInput[]
    NOT?: PlaylistWhereInput | PlaylistWhereInput[]
    playlist_id?: StringFilter<"Playlist"> | string
    userId?: StringFilter<"Playlist"> | string
    name?: StringFilter<"Playlist"> | string
    private?: BoolFilter<"Playlist"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    tracks?: TrackListRelationFilter
  }

  export type PlaylistOrderByWithRelationInput = {
    playlist_id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    private?: SortOrder
    user?: UserOrderByWithRelationInput
    tracks?: TrackOrderByRelationAggregateInput
  }

  export type PlaylistWhereUniqueInput = Prisma.AtLeast<{
    playlist_id?: string
    userId_name?: PlaylistUserIdNameCompoundUniqueInput
    AND?: PlaylistWhereInput | PlaylistWhereInput[]
    OR?: PlaylistWhereInput[]
    NOT?: PlaylistWhereInput | PlaylistWhereInput[]
    userId?: StringFilter<"Playlist"> | string
    name?: StringFilter<"Playlist"> | string
    private?: BoolFilter<"Playlist"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    tracks?: TrackListRelationFilter
  }, "playlist_id" | "userId_name">

  export type PlaylistOrderByWithAggregationInput = {
    playlist_id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    private?: SortOrder
    _count?: PlaylistCountOrderByAggregateInput
    _max?: PlaylistMaxOrderByAggregateInput
    _min?: PlaylistMinOrderByAggregateInput
  }

  export type PlaylistScalarWhereWithAggregatesInput = {
    AND?: PlaylistScalarWhereWithAggregatesInput | PlaylistScalarWhereWithAggregatesInput[]
    OR?: PlaylistScalarWhereWithAggregatesInput[]
    NOT?: PlaylistScalarWhereWithAggregatesInput | PlaylistScalarWhereWithAggregatesInput[]
    playlist_id?: StringWithAggregatesFilter<"Playlist"> | string
    userId?: StringWithAggregatesFilter<"Playlist"> | string
    name?: StringWithAggregatesFilter<"Playlist"> | string
    private?: BoolWithAggregatesFilter<"Playlist"> | boolean
  }

  export type TrackWhereInput = {
    AND?: TrackWhereInput | TrackWhereInput[]
    OR?: TrackWhereInput[]
    NOT?: TrackWhereInput | TrackWhereInput[]
    track_id?: StringFilter<"Track"> | string
    uri?: StringFilter<"Track"> | string
    name?: StringFilter<"Track"> | string
    encode?: StringFilter<"Track"> | string
    duration?: IntFilter<"Track"> | number
    playlist_id?: StringFilter<"Track"> | string
    playlist?: XOR<PlaylistScalarRelationFilter, PlaylistWhereInput>
  }

  export type TrackOrderByWithRelationInput = {
    track_id?: SortOrder
    uri?: SortOrder
    name?: SortOrder
    encode?: SortOrder
    duration?: SortOrder
    playlist_id?: SortOrder
    playlist?: PlaylistOrderByWithRelationInput
  }

  export type TrackWhereUniqueInput = Prisma.AtLeast<{
    track_id?: string
    AND?: TrackWhereInput | TrackWhereInput[]
    OR?: TrackWhereInput[]
    NOT?: TrackWhereInput | TrackWhereInput[]
    uri?: StringFilter<"Track"> | string
    name?: StringFilter<"Track"> | string
    encode?: StringFilter<"Track"> | string
    duration?: IntFilter<"Track"> | number
    playlist_id?: StringFilter<"Track"> | string
    playlist?: XOR<PlaylistScalarRelationFilter, PlaylistWhereInput>
  }, "track_id">

  export type TrackOrderByWithAggregationInput = {
    track_id?: SortOrder
    uri?: SortOrder
    name?: SortOrder
    encode?: SortOrder
    duration?: SortOrder
    playlist_id?: SortOrder
    _count?: TrackCountOrderByAggregateInput
    _avg?: TrackAvgOrderByAggregateInput
    _max?: TrackMaxOrderByAggregateInput
    _min?: TrackMinOrderByAggregateInput
    _sum?: TrackSumOrderByAggregateInput
  }

  export type TrackScalarWhereWithAggregatesInput = {
    AND?: TrackScalarWhereWithAggregatesInput | TrackScalarWhereWithAggregatesInput[]
    OR?: TrackScalarWhereWithAggregatesInput[]
    NOT?: TrackScalarWhereWithAggregatesInput | TrackScalarWhereWithAggregatesInput[]
    track_id?: StringWithAggregatesFilter<"Track"> | string
    uri?: StringWithAggregatesFilter<"Track"> | string
    name?: StringWithAggregatesFilter<"Track"> | string
    encode?: StringWithAggregatesFilter<"Track"> | string
    duration?: IntWithAggregatesFilter<"Track"> | number
    playlist_id?: StringWithAggregatesFilter<"Track"> | string
  }

  export type BotWhereInput = {
    AND?: BotWhereInput | BotWhereInput[]
    OR?: BotWhereInput[]
    NOT?: BotWhereInput | BotWhereInput[]
    botId?: StringFilter<"Bot"> | string
    voiceId?: StringNullableFilter<"Bot"> | string | null
  }

  export type BotOrderByWithRelationInput = {
    botId?: SortOrder
    voiceId?: SortOrderInput | SortOrder
  }

  export type BotWhereUniqueInput = Prisma.AtLeast<{
    botId?: string
    voiceId?: string
    AND?: BotWhereInput | BotWhereInput[]
    OR?: BotWhereInput[]
    NOT?: BotWhereInput | BotWhereInput[]
  }, "botId" | "voiceId">

  export type BotOrderByWithAggregationInput = {
    botId?: SortOrder
    voiceId?: SortOrderInput | SortOrder
    _count?: BotCountOrderByAggregateInput
    _max?: BotMaxOrderByAggregateInput
    _min?: BotMinOrderByAggregateInput
  }

  export type BotScalarWhereWithAggregatesInput = {
    AND?: BotScalarWhereWithAggregatesInput | BotScalarWhereWithAggregatesInput[]
    OR?: BotScalarWhereWithAggregatesInput[]
    NOT?: BotScalarWhereWithAggregatesInput | BotScalarWhereWithAggregatesInput[]
    botId?: StringWithAggregatesFilter<"Bot"> | string
    voiceId?: StringNullableWithAggregatesFilter<"Bot"> | string | null
  }

  export type GuildWhereInput = {
    AND?: GuildWhereInput | GuildWhereInput[]
    OR?: GuildWhereInput[]
    NOT?: GuildWhereInput | GuildWhereInput[]
    guildId?: StringFilter<"Guild"> | string
    premiumFrom?: DateTimeNullableFilter<"Guild"> | Date | string | null
    premiumTo?: DateTimeNullableFilter<"Guild"> | Date | string | null
    premiumPlan?: EnumPremiumPlanFilter<"Guild"> | $Enums.PremiumPlan
    language?: StringFilter<"Guild"> | string
    customBotName?: StringNullableFilter<"Guild"> | string | null
    embedColor?: StringNullableFilter<"Guild"> | string | null
    defaultVolume?: IntNullableFilter<"Guild"> | number | null
    enable247?: BoolFilter<"Guild"> | boolean
    enableAutoplay?: BoolFilter<"Guild"> | boolean
    enableVoteSkip?: BoolFilter<"Guild"> | boolean
    isActive?: BoolFilter<"Guild"> | boolean
    lastActivity?: DateTimeFilter<"Guild"> | Date | string
    totalCommands?: IntFilter<"Guild"> | number
    premiumSlots?: IntFilter<"Guild"> | number
    guildBotSettings?: XOR<GuildBotSettingsNullableScalarRelationFilter, GuildBotSettingsWhereInput> | null
  }

  export type GuildOrderByWithRelationInput = {
    guildId?: SortOrder
    premiumFrom?: SortOrderInput | SortOrder
    premiumTo?: SortOrderInput | SortOrder
    premiumPlan?: SortOrder
    language?: SortOrder
    customBotName?: SortOrderInput | SortOrder
    embedColor?: SortOrderInput | SortOrder
    defaultVolume?: SortOrderInput | SortOrder
    enable247?: SortOrder
    enableAutoplay?: SortOrder
    enableVoteSkip?: SortOrder
    isActive?: SortOrder
    lastActivity?: SortOrder
    totalCommands?: SortOrder
    premiumSlots?: SortOrder
    guildBotSettings?: GuildBotSettingsOrderByWithRelationInput
  }

  export type GuildWhereUniqueInput = Prisma.AtLeast<{
    guildId?: string
    AND?: GuildWhereInput | GuildWhereInput[]
    OR?: GuildWhereInput[]
    NOT?: GuildWhereInput | GuildWhereInput[]
    premiumFrom?: DateTimeNullableFilter<"Guild"> | Date | string | null
    premiumTo?: DateTimeNullableFilter<"Guild"> | Date | string | null
    premiumPlan?: EnumPremiumPlanFilter<"Guild"> | $Enums.PremiumPlan
    language?: StringFilter<"Guild"> | string
    customBotName?: StringNullableFilter<"Guild"> | string | null
    embedColor?: StringNullableFilter<"Guild"> | string | null
    defaultVolume?: IntNullableFilter<"Guild"> | number | null
    enable247?: BoolFilter<"Guild"> | boolean
    enableAutoplay?: BoolFilter<"Guild"> | boolean
    enableVoteSkip?: BoolFilter<"Guild"> | boolean
    isActive?: BoolFilter<"Guild"> | boolean
    lastActivity?: DateTimeFilter<"Guild"> | Date | string
    totalCommands?: IntFilter<"Guild"> | number
    premiumSlots?: IntFilter<"Guild"> | number
    guildBotSettings?: XOR<GuildBotSettingsNullableScalarRelationFilter, GuildBotSettingsWhereInput> | null
  }, "guildId">

  export type GuildOrderByWithAggregationInput = {
    guildId?: SortOrder
    premiumFrom?: SortOrderInput | SortOrder
    premiumTo?: SortOrderInput | SortOrder
    premiumPlan?: SortOrder
    language?: SortOrder
    customBotName?: SortOrderInput | SortOrder
    embedColor?: SortOrderInput | SortOrder
    defaultVolume?: SortOrderInput | SortOrder
    enable247?: SortOrder
    enableAutoplay?: SortOrder
    enableVoteSkip?: SortOrder
    isActive?: SortOrder
    lastActivity?: SortOrder
    totalCommands?: SortOrder
    premiumSlots?: SortOrder
    _count?: GuildCountOrderByAggregateInput
    _avg?: GuildAvgOrderByAggregateInput
    _max?: GuildMaxOrderByAggregateInput
    _min?: GuildMinOrderByAggregateInput
    _sum?: GuildSumOrderByAggregateInput
  }

  export type GuildScalarWhereWithAggregatesInput = {
    AND?: GuildScalarWhereWithAggregatesInput | GuildScalarWhereWithAggregatesInput[]
    OR?: GuildScalarWhereWithAggregatesInput[]
    NOT?: GuildScalarWhereWithAggregatesInput | GuildScalarWhereWithAggregatesInput[]
    guildId?: StringWithAggregatesFilter<"Guild"> | string
    premiumFrom?: DateTimeNullableWithAggregatesFilter<"Guild"> | Date | string | null
    premiumTo?: DateTimeNullableWithAggregatesFilter<"Guild"> | Date | string | null
    premiumPlan?: EnumPremiumPlanWithAggregatesFilter<"Guild"> | $Enums.PremiumPlan
    language?: StringWithAggregatesFilter<"Guild"> | string
    customBotName?: StringNullableWithAggregatesFilter<"Guild"> | string | null
    embedColor?: StringNullableWithAggregatesFilter<"Guild"> | string | null
    defaultVolume?: IntNullableWithAggregatesFilter<"Guild"> | number | null
    enable247?: BoolWithAggregatesFilter<"Guild"> | boolean
    enableAutoplay?: BoolWithAggregatesFilter<"Guild"> | boolean
    enableVoteSkip?: BoolWithAggregatesFilter<"Guild"> | boolean
    isActive?: BoolWithAggregatesFilter<"Guild"> | boolean
    lastActivity?: DateTimeWithAggregatesFilter<"Guild"> | Date | string
    totalCommands?: IntWithAggregatesFilter<"Guild"> | number
    premiumSlots?: IntWithAggregatesFilter<"Guild"> | number
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    userId?: StringFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    discriminator?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    premiumFrom?: DateTimeNullableFilter<"User"> | Date | string | null
    premiumTo?: DateTimeNullableFilter<"User"> | Date | string | null
    premiumPlan?: EnumPremiumPlanFilter<"User"> | $Enums.PremiumPlan
    premiumPlus?: BoolFilter<"User"> | boolean
    stripeCustomerId?: StringNullableFilter<"User"> | string | null
    stripeSubscriptionId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    playlists?: PlaylistListRelationFilter
    botInstance?: XOR<BotInstanceNullableScalarRelationFilter, BotInstanceWhereInput> | null
    payments?: PaymentListRelationFilter
    guildOwner?: XOR<GuildOwnerNullableScalarRelationFilter, GuildOwnerWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    userId?: SortOrder
    username?: SortOrderInput | SortOrder
    discriminator?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    premiumFrom?: SortOrderInput | SortOrder
    premiumTo?: SortOrderInput | SortOrder
    premiumPlan?: SortOrder
    premiumPlus?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    playlists?: PlaylistOrderByRelationAggregateInput
    botInstance?: BotInstanceOrderByWithRelationInput
    payments?: PaymentOrderByRelationAggregateInput
    guildOwner?: GuildOwnerOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    username?: StringNullableFilter<"User"> | string | null
    discriminator?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    premiumFrom?: DateTimeNullableFilter<"User"> | Date | string | null
    premiumTo?: DateTimeNullableFilter<"User"> | Date | string | null
    premiumPlan?: EnumPremiumPlanFilter<"User"> | $Enums.PremiumPlan
    premiumPlus?: BoolFilter<"User"> | boolean
    stripeCustomerId?: StringNullableFilter<"User"> | string | null
    stripeSubscriptionId?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    playlists?: PlaylistListRelationFilter
    botInstance?: XOR<BotInstanceNullableScalarRelationFilter, BotInstanceWhereInput> | null
    payments?: PaymentListRelationFilter
    guildOwner?: XOR<GuildOwnerNullableScalarRelationFilter, GuildOwnerWhereInput> | null
  }, "userId">

  export type UserOrderByWithAggregationInput = {
    userId?: SortOrder
    username?: SortOrderInput | SortOrder
    discriminator?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    premiumFrom?: SortOrderInput | SortOrder
    premiumTo?: SortOrderInput | SortOrder
    premiumPlan?: SortOrder
    premiumPlus?: SortOrder
    stripeCustomerId?: SortOrderInput | SortOrder
    stripeSubscriptionId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"User"> | string
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    discriminator?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    premiumFrom?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    premiumTo?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    premiumPlan?: EnumPremiumPlanWithAggregatesFilter<"User"> | $Enums.PremiumPlan
    premiumPlus?: BoolWithAggregatesFilter<"User"> | boolean
    stripeCustomerId?: StringNullableWithAggregatesFilter<"User"> | string | null
    stripeSubscriptionId?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PremiumFeatureWhereInput = {
    AND?: PremiumFeatureWhereInput | PremiumFeatureWhereInput[]
    OR?: PremiumFeatureWhereInput[]
    NOT?: PremiumFeatureWhereInput | PremiumFeatureWhereInput[]
    id?: StringFilter<"PremiumFeature"> | string
    name?: StringFilter<"PremiumFeature"> | string
    description?: StringNullableFilter<"PremiumFeature"> | string | null
    price?: FloatNullableFilter<"PremiumFeature"> | number | null
    duration?: IntNullableFilter<"PremiumFeature"> | number | null
    features?: StringNullableListFilter<"PremiumFeature">
    isActive?: BoolFilter<"PremiumFeature"> | boolean
    createdAt?: DateTimeFilter<"PremiumFeature"> | Date | string
    updatedAt?: DateTimeFilter<"PremiumFeature"> | Date | string
  }

  export type PremiumFeatureOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    features?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PremiumFeatureWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PremiumFeatureWhereInput | PremiumFeatureWhereInput[]
    OR?: PremiumFeatureWhereInput[]
    NOT?: PremiumFeatureWhereInput | PremiumFeatureWhereInput[]
    name?: StringFilter<"PremiumFeature"> | string
    description?: StringNullableFilter<"PremiumFeature"> | string | null
    price?: FloatNullableFilter<"PremiumFeature"> | number | null
    duration?: IntNullableFilter<"PremiumFeature"> | number | null
    features?: StringNullableListFilter<"PremiumFeature">
    isActive?: BoolFilter<"PremiumFeature"> | boolean
    createdAt?: DateTimeFilter<"PremiumFeature"> | Date | string
    updatedAt?: DateTimeFilter<"PremiumFeature"> | Date | string
  }, "id">

  export type PremiumFeatureOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    features?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PremiumFeatureCountOrderByAggregateInput
    _avg?: PremiumFeatureAvgOrderByAggregateInput
    _max?: PremiumFeatureMaxOrderByAggregateInput
    _min?: PremiumFeatureMinOrderByAggregateInput
    _sum?: PremiumFeatureSumOrderByAggregateInput
  }

  export type PremiumFeatureScalarWhereWithAggregatesInput = {
    AND?: PremiumFeatureScalarWhereWithAggregatesInput | PremiumFeatureScalarWhereWithAggregatesInput[]
    OR?: PremiumFeatureScalarWhereWithAggregatesInput[]
    NOT?: PremiumFeatureScalarWhereWithAggregatesInput | PremiumFeatureScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PremiumFeature"> | string
    name?: StringWithAggregatesFilter<"PremiumFeature"> | string
    description?: StringNullableWithAggregatesFilter<"PremiumFeature"> | string | null
    price?: FloatNullableWithAggregatesFilter<"PremiumFeature"> | number | null
    duration?: IntNullableWithAggregatesFilter<"PremiumFeature"> | number | null
    features?: StringNullableListFilter<"PremiumFeature">
    isActive?: BoolWithAggregatesFilter<"PremiumFeature"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PremiumFeature"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PremiumFeature"> | Date | string
  }

  export type GuildBotSettingsWhereInput = {
    AND?: GuildBotSettingsWhereInput | GuildBotSettingsWhereInput[]
    OR?: GuildBotSettingsWhereInput[]
    NOT?: GuildBotSettingsWhereInput | GuildBotSettingsWhereInput[]
    id?: StringFilter<"GuildBotSettings"> | string
    guildId?: StringFilter<"GuildBotSettings"> | string
    botName?: StringNullableFilter<"GuildBotSettings"> | string | null
    botAvatar?: StringNullableFilter<"GuildBotSettings"> | string | null
    embedColor?: StringNullableFilter<"GuildBotSettings"> | string | null
    createdAt?: DateTimeFilter<"GuildBotSettings"> | Date | string
    updatedAt?: DateTimeFilter<"GuildBotSettings"> | Date | string
    guild?: XOR<GuildScalarRelationFilter, GuildWhereInput>
  }

  export type GuildBotSettingsOrderByWithRelationInput = {
    id?: SortOrder
    guildId?: SortOrder
    botName?: SortOrderInput | SortOrder
    botAvatar?: SortOrderInput | SortOrder
    embedColor?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    guild?: GuildOrderByWithRelationInput
  }

  export type GuildBotSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    guildId?: string
    AND?: GuildBotSettingsWhereInput | GuildBotSettingsWhereInput[]
    OR?: GuildBotSettingsWhereInput[]
    NOT?: GuildBotSettingsWhereInput | GuildBotSettingsWhereInput[]
    botName?: StringNullableFilter<"GuildBotSettings"> | string | null
    botAvatar?: StringNullableFilter<"GuildBotSettings"> | string | null
    embedColor?: StringNullableFilter<"GuildBotSettings"> | string | null
    createdAt?: DateTimeFilter<"GuildBotSettings"> | Date | string
    updatedAt?: DateTimeFilter<"GuildBotSettings"> | Date | string
    guild?: XOR<GuildScalarRelationFilter, GuildWhereInput>
  }, "id" | "guildId">

  export type GuildBotSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    guildId?: SortOrder
    botName?: SortOrderInput | SortOrder
    botAvatar?: SortOrderInput | SortOrder
    embedColor?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: GuildBotSettingsCountOrderByAggregateInput
    _max?: GuildBotSettingsMaxOrderByAggregateInput
    _min?: GuildBotSettingsMinOrderByAggregateInput
  }

  export type GuildBotSettingsScalarWhereWithAggregatesInput = {
    AND?: GuildBotSettingsScalarWhereWithAggregatesInput | GuildBotSettingsScalarWhereWithAggregatesInput[]
    OR?: GuildBotSettingsScalarWhereWithAggregatesInput[]
    NOT?: GuildBotSettingsScalarWhereWithAggregatesInput | GuildBotSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GuildBotSettings"> | string
    guildId?: StringWithAggregatesFilter<"GuildBotSettings"> | string
    botName?: StringNullableWithAggregatesFilter<"GuildBotSettings"> | string | null
    botAvatar?: StringNullableWithAggregatesFilter<"GuildBotSettings"> | string | null
    embedColor?: StringNullableWithAggregatesFilter<"GuildBotSettings"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"GuildBotSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"GuildBotSettings"> | Date | string
  }

  export type BotInstanceWhereInput = {
    AND?: BotInstanceWhereInput | BotInstanceWhereInput[]
    OR?: BotInstanceWhereInput[]
    NOT?: BotInstanceWhereInput | BotInstanceWhereInput[]
    id?: StringFilter<"BotInstance"> | string
    userId?: StringFilter<"BotInstance"> | string
    botToken?: StringFilter<"BotInstance"> | string
    applicationId?: StringFilter<"BotInstance"> | string
    botName?: StringFilter<"BotInstance"> | string
    botStatus?: StringFilter<"BotInstance"> | string
    botActivity?: StringNullableFilter<"BotInstance"> | string | null
    isActive?: BoolFilter<"BotInstance"> | boolean
    pm2ProcessId?: StringNullableFilter<"BotInstance"> | string | null
    defaultVolume?: IntFilter<"BotInstance"> | number
    enable247?: BoolFilter<"BotInstance"> | boolean
    enableAutoplay?: BoolFilter<"BotInstance"> | boolean
    createdAt?: DateTimeFilter<"BotInstance"> | Date | string
    updatedAt?: DateTimeFilter<"BotInstance"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type BotInstanceOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    botToken?: SortOrder
    applicationId?: SortOrder
    botName?: SortOrder
    botStatus?: SortOrder
    botActivity?: SortOrderInput | SortOrder
    isActive?: SortOrder
    pm2ProcessId?: SortOrderInput | SortOrder
    defaultVolume?: SortOrder
    enable247?: SortOrder
    enableAutoplay?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type BotInstanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: BotInstanceWhereInput | BotInstanceWhereInput[]
    OR?: BotInstanceWhereInput[]
    NOT?: BotInstanceWhereInput | BotInstanceWhereInput[]
    botToken?: StringFilter<"BotInstance"> | string
    applicationId?: StringFilter<"BotInstance"> | string
    botName?: StringFilter<"BotInstance"> | string
    botStatus?: StringFilter<"BotInstance"> | string
    botActivity?: StringNullableFilter<"BotInstance"> | string | null
    isActive?: BoolFilter<"BotInstance"> | boolean
    pm2ProcessId?: StringNullableFilter<"BotInstance"> | string | null
    defaultVolume?: IntFilter<"BotInstance"> | number
    enable247?: BoolFilter<"BotInstance"> | boolean
    enableAutoplay?: BoolFilter<"BotInstance"> | boolean
    createdAt?: DateTimeFilter<"BotInstance"> | Date | string
    updatedAt?: DateTimeFilter<"BotInstance"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type BotInstanceOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    botToken?: SortOrder
    applicationId?: SortOrder
    botName?: SortOrder
    botStatus?: SortOrder
    botActivity?: SortOrderInput | SortOrder
    isActive?: SortOrder
    pm2ProcessId?: SortOrderInput | SortOrder
    defaultVolume?: SortOrder
    enable247?: SortOrder
    enableAutoplay?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BotInstanceCountOrderByAggregateInput
    _avg?: BotInstanceAvgOrderByAggregateInput
    _max?: BotInstanceMaxOrderByAggregateInput
    _min?: BotInstanceMinOrderByAggregateInput
    _sum?: BotInstanceSumOrderByAggregateInput
  }

  export type BotInstanceScalarWhereWithAggregatesInput = {
    AND?: BotInstanceScalarWhereWithAggregatesInput | BotInstanceScalarWhereWithAggregatesInput[]
    OR?: BotInstanceScalarWhereWithAggregatesInput[]
    NOT?: BotInstanceScalarWhereWithAggregatesInput | BotInstanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BotInstance"> | string
    userId?: StringWithAggregatesFilter<"BotInstance"> | string
    botToken?: StringWithAggregatesFilter<"BotInstance"> | string
    applicationId?: StringWithAggregatesFilter<"BotInstance"> | string
    botName?: StringWithAggregatesFilter<"BotInstance"> | string
    botStatus?: StringWithAggregatesFilter<"BotInstance"> | string
    botActivity?: StringNullableWithAggregatesFilter<"BotInstance"> | string | null
    isActive?: BoolWithAggregatesFilter<"BotInstance"> | boolean
    pm2ProcessId?: StringNullableWithAggregatesFilter<"BotInstance"> | string | null
    defaultVolume?: IntWithAggregatesFilter<"BotInstance"> | number
    enable247?: BoolWithAggregatesFilter<"BotInstance"> | boolean
    enableAutoplay?: BoolWithAggregatesFilter<"BotInstance"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"BotInstance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BotInstance"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    userId?: StringFilter<"Payment"> | string
    planId?: StringNullableFilter<"Payment"> | string | null
    stripeSessionId?: StringNullableFilter<"Payment"> | string | null
    transactionId?: StringNullableFilter<"Payment"> | string | null
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    paymentMethod?: StringFilter<"Payment"> | string
    status?: StringFilter<"Payment"> | string
    duration?: IntFilter<"Payment"> | number
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    plan?: XOR<PlanNullableScalarRelationFilter, PlanWhereInput> | null
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    planId?: SortOrderInput | SortOrder
    stripeSessionId?: SortOrderInput | SortOrder
    transactionId?: SortOrderInput | SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    plan?: PlanOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    userId?: StringFilter<"Payment"> | string
    planId?: StringNullableFilter<"Payment"> | string | null
    stripeSessionId?: StringNullableFilter<"Payment"> | string | null
    transactionId?: StringNullableFilter<"Payment"> | string | null
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    paymentMethod?: StringFilter<"Payment"> | string
    status?: StringFilter<"Payment"> | string
    duration?: IntFilter<"Payment"> | number
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    plan?: XOR<PlanNullableScalarRelationFilter, PlanWhereInput> | null
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    planId?: SortOrderInput | SortOrder
    stripeSessionId?: SortOrderInput | SortOrder
    transactionId?: SortOrderInput | SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    userId?: StringWithAggregatesFilter<"Payment"> | string
    planId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    stripeSessionId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    transactionId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    amount?: FloatWithAggregatesFilter<"Payment"> | number
    currency?: StringWithAggregatesFilter<"Payment"> | string
    paymentMethod?: StringWithAggregatesFilter<"Payment"> | string
    status?: StringWithAggregatesFilter<"Payment"> | string
    duration?: IntWithAggregatesFilter<"Payment"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type PlanWhereInput = {
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    id?: StringFilter<"Plan"> | string
    name?: StringFilter<"Plan"> | string
    description?: StringNullableFilter<"Plan"> | string | null
    price?: FloatFilter<"Plan"> | number
    currency?: StringFilter<"Plan"> | string
    durationDays?: IntFilter<"Plan"> | number
    features?: StringNullableListFilter<"Plan">
    isActive?: BoolFilter<"Plan"> | boolean
    stripePriceId?: StringNullableFilter<"Plan"> | string | null
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
    payments?: PaymentListRelationFilter
  }

  export type PlanOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    currency?: SortOrder
    durationDays?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    stripePriceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    payments?: PaymentOrderByRelationAggregateInput
  }

  export type PlanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlanWhereInput | PlanWhereInput[]
    OR?: PlanWhereInput[]
    NOT?: PlanWhereInput | PlanWhereInput[]
    name?: StringFilter<"Plan"> | string
    description?: StringNullableFilter<"Plan"> | string | null
    price?: FloatFilter<"Plan"> | number
    currency?: StringFilter<"Plan"> | string
    durationDays?: IntFilter<"Plan"> | number
    features?: StringNullableListFilter<"Plan">
    isActive?: BoolFilter<"Plan"> | boolean
    stripePriceId?: StringNullableFilter<"Plan"> | string | null
    createdAt?: DateTimeFilter<"Plan"> | Date | string
    updatedAt?: DateTimeFilter<"Plan"> | Date | string
    payments?: PaymentListRelationFilter
  }, "id">

  export type PlanOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    currency?: SortOrder
    durationDays?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    stripePriceId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlanCountOrderByAggregateInput
    _avg?: PlanAvgOrderByAggregateInput
    _max?: PlanMaxOrderByAggregateInput
    _min?: PlanMinOrderByAggregateInput
    _sum?: PlanSumOrderByAggregateInput
  }

  export type PlanScalarWhereWithAggregatesInput = {
    AND?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    OR?: PlanScalarWhereWithAggregatesInput[]
    NOT?: PlanScalarWhereWithAggregatesInput | PlanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Plan"> | string
    name?: StringWithAggregatesFilter<"Plan"> | string
    description?: StringNullableWithAggregatesFilter<"Plan"> | string | null
    price?: FloatWithAggregatesFilter<"Plan"> | number
    currency?: StringWithAggregatesFilter<"Plan"> | string
    durationDays?: IntWithAggregatesFilter<"Plan"> | number
    features?: StringNullableListFilter<"Plan">
    isActive?: BoolWithAggregatesFilter<"Plan"> | boolean
    stripePriceId?: StringNullableWithAggregatesFilter<"Plan"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Plan"> | Date | string
  }

  export type GuildOwnerWhereInput = {
    AND?: GuildOwnerWhereInput | GuildOwnerWhereInput[]
    OR?: GuildOwnerWhereInput[]
    NOT?: GuildOwnerWhereInput | GuildOwnerWhereInput[]
    userId?: StringFilter<"GuildOwner"> | string
    guildId?: StringFilter<"GuildOwner"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type GuildOwnerOrderByWithRelationInput = {
    userId?: SortOrder
    guildId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type GuildOwnerWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    guildId?: string
    AND?: GuildOwnerWhereInput | GuildOwnerWhereInput[]
    OR?: GuildOwnerWhereInput[]
    NOT?: GuildOwnerWhereInput | GuildOwnerWhereInput[]
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "userId" | "guildId">

  export type GuildOwnerOrderByWithAggregationInput = {
    userId?: SortOrder
    guildId?: SortOrder
    _count?: GuildOwnerCountOrderByAggregateInput
    _max?: GuildOwnerMaxOrderByAggregateInput
    _min?: GuildOwnerMinOrderByAggregateInput
  }

  export type GuildOwnerScalarWhereWithAggregatesInput = {
    AND?: GuildOwnerScalarWhereWithAggregatesInput | GuildOwnerScalarWhereWithAggregatesInput[]
    OR?: GuildOwnerScalarWhereWithAggregatesInput[]
    NOT?: GuildOwnerScalarWhereWithAggregatesInput | GuildOwnerScalarWhereWithAggregatesInput[]
    userId?: StringWithAggregatesFilter<"GuildOwner"> | string
    guildId?: StringWithAggregatesFilter<"GuildOwner"> | string
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: StringFilter<"Admin"> | string
    email?: StringFilter<"Admin"> | string
    passwordHash?: StringFilter<"Admin"> | string
    isRegistered?: BoolFilter<"Admin"> | boolean
    isMaster?: BoolFilter<"Admin"> | boolean
    permissions?: StringNullableListFilter<"Admin">
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
    lastLogin?: DateTimeNullableFilter<"Admin"> | Date | string | null
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isRegistered?: SortOrder
    isMaster?: SortOrder
    permissions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    passwordHash?: StringFilter<"Admin"> | string
    isRegistered?: BoolFilter<"Admin"> | boolean
    isMaster?: BoolFilter<"Admin"> | boolean
    permissions?: StringNullableListFilter<"Admin">
    createdAt?: DateTimeFilter<"Admin"> | Date | string
    updatedAt?: DateTimeFilter<"Admin"> | Date | string
    lastLogin?: DateTimeNullableFilter<"Admin"> | Date | string | null
  }, "id" | "email">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isRegistered?: SortOrder
    isMaster?: SortOrder
    permissions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    _count?: AdminCountOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Admin"> | string
    email?: StringWithAggregatesFilter<"Admin"> | string
    passwordHash?: StringWithAggregatesFilter<"Admin"> | string
    isRegistered?: BoolWithAggregatesFilter<"Admin"> | boolean
    isMaster?: BoolWithAggregatesFilter<"Admin"> | boolean
    permissions?: StringNullableListFilter<"Admin">
    createdAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Admin"> | Date | string
    lastLogin?: DateTimeNullableWithAggregatesFilter<"Admin"> | Date | string | null
  }

  export type OtpVerificationWhereInput = {
    AND?: OtpVerificationWhereInput | OtpVerificationWhereInput[]
    OR?: OtpVerificationWhereInput[]
    NOT?: OtpVerificationWhereInput | OtpVerificationWhereInput[]
    id?: StringFilter<"OtpVerification"> | string
    email?: StringFilter<"OtpVerification"> | string
    otp?: StringFilter<"OtpVerification"> | string
    type?: StringFilter<"OtpVerification"> | string
    expiresAt?: DateTimeFilter<"OtpVerification"> | Date | string
    used?: BoolFilter<"OtpVerification"> | boolean
    createdAt?: DateTimeFilter<"OtpVerification"> | Date | string
  }

  export type OtpVerificationOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    otp?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpVerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OtpVerificationWhereInput | OtpVerificationWhereInput[]
    OR?: OtpVerificationWhereInput[]
    NOT?: OtpVerificationWhereInput | OtpVerificationWhereInput[]
    email?: StringFilter<"OtpVerification"> | string
    otp?: StringFilter<"OtpVerification"> | string
    type?: StringFilter<"OtpVerification"> | string
    expiresAt?: DateTimeFilter<"OtpVerification"> | Date | string
    used?: BoolFilter<"OtpVerification"> | boolean
    createdAt?: DateTimeFilter<"OtpVerification"> | Date | string
  }, "id">

  export type OtpVerificationOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    otp?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
    _count?: OtpVerificationCountOrderByAggregateInput
    _max?: OtpVerificationMaxOrderByAggregateInput
    _min?: OtpVerificationMinOrderByAggregateInput
  }

  export type OtpVerificationScalarWhereWithAggregatesInput = {
    AND?: OtpVerificationScalarWhereWithAggregatesInput | OtpVerificationScalarWhereWithAggregatesInput[]
    OR?: OtpVerificationScalarWhereWithAggregatesInput[]
    NOT?: OtpVerificationScalarWhereWithAggregatesInput | OtpVerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OtpVerification"> | string
    email?: StringWithAggregatesFilter<"OtpVerification"> | string
    otp?: StringWithAggregatesFilter<"OtpVerification"> | string
    type?: StringWithAggregatesFilter<"OtpVerification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"OtpVerification"> | Date | string
    used?: BoolWithAggregatesFilter<"OtpVerification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"OtpVerification"> | Date | string
  }

  export type PlaylistCreateInput = {
    playlist_id?: string
    name: string
    private?: boolean
    user: UserCreateNestedOneWithoutPlaylistsInput
    tracks?: TrackCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistUncheckedCreateInput = {
    playlist_id?: string
    userId: string
    name: string
    private?: boolean
    tracks?: TrackUncheckedCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistUpdateInput = {
    playlist_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutPlaylistsNestedInput
    tracks?: TrackUpdateManyWithoutPlaylistNestedInput
  }

  export type PlaylistUncheckedUpdateInput = {
    playlist_id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    tracks?: TrackUncheckedUpdateManyWithoutPlaylistNestedInput
  }

  export type PlaylistCreateManyInput = {
    playlist_id?: string
    userId: string
    name: string
    private?: boolean
  }

  export type PlaylistUpdateManyMutationInput = {
    playlist_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PlaylistUncheckedUpdateManyInput = {
    playlist_id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
  }

  export type TrackCreateInput = {
    track_id?: string
    uri: string
    name: string
    encode: string
    duration: number
    playlist: PlaylistCreateNestedOneWithoutTracksInput
  }

  export type TrackUncheckedCreateInput = {
    track_id?: string
    uri: string
    name: string
    encode: string
    duration: number
    playlist_id: string
  }

  export type TrackUpdateInput = {
    track_id?: StringFieldUpdateOperationsInput | string
    uri?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    encode?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    playlist?: PlaylistUpdateOneRequiredWithoutTracksNestedInput
  }

  export type TrackUncheckedUpdateInput = {
    track_id?: StringFieldUpdateOperationsInput | string
    uri?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    encode?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    playlist_id?: StringFieldUpdateOperationsInput | string
  }

  export type TrackCreateManyInput = {
    track_id?: string
    uri: string
    name: string
    encode: string
    duration: number
    playlist_id: string
  }

  export type TrackUpdateManyMutationInput = {
    track_id?: StringFieldUpdateOperationsInput | string
    uri?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    encode?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
  }

  export type TrackUncheckedUpdateManyInput = {
    track_id?: StringFieldUpdateOperationsInput | string
    uri?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    encode?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    playlist_id?: StringFieldUpdateOperationsInput | string
  }

  export type BotCreateInput = {
    botId: string
    voiceId?: string | null
  }

  export type BotUncheckedCreateInput = {
    botId: string
    voiceId?: string | null
  }

  export type BotUpdateInput = {
    botId?: StringFieldUpdateOperationsInput | string
    voiceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BotUncheckedUpdateInput = {
    botId?: StringFieldUpdateOperationsInput | string
    voiceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BotCreateManyInput = {
    botId: string
    voiceId?: string | null
  }

  export type BotUpdateManyMutationInput = {
    botId?: StringFieldUpdateOperationsInput | string
    voiceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BotUncheckedUpdateManyInput = {
    botId?: StringFieldUpdateOperationsInput | string
    voiceId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type GuildCreateInput = {
    guildId: string
    premiumFrom?: Date | string | null
    premiumTo?: Date | string | null
    premiumPlan?: $Enums.PremiumPlan
    language?: string
    customBotName?: string | null
    embedColor?: string | null
    defaultVolume?: number | null
    enable247?: boolean
    enableAutoplay?: boolean
    enableVoteSkip?: boolean
    isActive?: boolean
    lastActivity?: Date | string
    totalCommands?: number
    premiumSlots?: number
    guildBotSettings?: GuildBotSettingsCreateNestedOneWithoutGuildInput
  }

  export type GuildUncheckedCreateInput = {
    guildId: string
    premiumFrom?: Date | string | null
    premiumTo?: Date | string | null
    premiumPlan?: $Enums.PremiumPlan
    language?: string
    customBotName?: string | null
    embedColor?: string | null
    defaultVolume?: number | null
    enable247?: boolean
    enableAutoplay?: boolean
    enableVoteSkip?: boolean
    isActive?: boolean
    lastActivity?: Date | string
    totalCommands?: number
    premiumSlots?: number
    guildBotSettings?: GuildBotSettingsUncheckedCreateNestedOneWithoutGuildInput
  }

  export type GuildUpdateInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    language?: StringFieldUpdateOperationsInput | string
    customBotName?: NullableStringFieldUpdateOperationsInput | string | null
    embedColor?: NullableStringFieldUpdateOperationsInput | string | null
    defaultVolume?: NullableIntFieldUpdateOperationsInput | number | null
    enable247?: BoolFieldUpdateOperationsInput | boolean
    enableAutoplay?: BoolFieldUpdateOperationsInput | boolean
    enableVoteSkip?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCommands?: IntFieldUpdateOperationsInput | number
    premiumSlots?: IntFieldUpdateOperationsInput | number
    guildBotSettings?: GuildBotSettingsUpdateOneWithoutGuildNestedInput
  }

  export type GuildUncheckedUpdateInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    language?: StringFieldUpdateOperationsInput | string
    customBotName?: NullableStringFieldUpdateOperationsInput | string | null
    embedColor?: NullableStringFieldUpdateOperationsInput | string | null
    defaultVolume?: NullableIntFieldUpdateOperationsInput | number | null
    enable247?: BoolFieldUpdateOperationsInput | boolean
    enableAutoplay?: BoolFieldUpdateOperationsInput | boolean
    enableVoteSkip?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCommands?: IntFieldUpdateOperationsInput | number
    premiumSlots?: IntFieldUpdateOperationsInput | number
    guildBotSettings?: GuildBotSettingsUncheckedUpdateOneWithoutGuildNestedInput
  }

  export type GuildCreateManyInput = {
    guildId: string
    premiumFrom?: Date | string | null
    premiumTo?: Date | string | null
    premiumPlan?: $Enums.PremiumPlan
    language?: string
    customBotName?: string | null
    embedColor?: string | null
    defaultVolume?: number | null
    enable247?: boolean
    enableAutoplay?: boolean
    enableVoteSkip?: boolean
    isActive?: boolean
    lastActivity?: Date | string
    totalCommands?: number
    premiumSlots?: number
  }

  export type GuildUpdateManyMutationInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    language?: StringFieldUpdateOperationsInput | string
    customBotName?: NullableStringFieldUpdateOperationsInput | string | null
    embedColor?: NullableStringFieldUpdateOperationsInput | string | null
    defaultVolume?: NullableIntFieldUpdateOperationsInput | number | null
    enable247?: BoolFieldUpdateOperationsInput | boolean
    enableAutoplay?: BoolFieldUpdateOperationsInput | boolean
    enableVoteSkip?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCommands?: IntFieldUpdateOperationsInput | number
    premiumSlots?: IntFieldUpdateOperationsInput | number
  }

  export type GuildUncheckedUpdateManyInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    language?: StringFieldUpdateOperationsInput | string
    customBotName?: NullableStringFieldUpdateOperationsInput | string | null
    embedColor?: NullableStringFieldUpdateOperationsInput | string | null
    defaultVolume?: NullableIntFieldUpdateOperationsInput | number | null
    enable247?: BoolFieldUpdateOperationsInput | boolean
    enableAutoplay?: BoolFieldUpdateOperationsInput | boolean
    enableVoteSkip?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCommands?: IntFieldUpdateOperationsInput | number
    premiumSlots?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateInput = {
    userId: string
    username?: string | null
    discriminator?: string | null
    avatar?: string | null
    email?: string | null
    premiumFrom?: Date | string | null
    premiumTo?: Date | string | null
    premiumPlan?: $Enums.PremiumPlan
    premiumPlus?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    playlists?: PlaylistCreateNestedManyWithoutUserInput
    botInstance?: BotInstanceCreateNestedOneWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    guildOwner?: GuildOwnerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    userId: string
    username?: string | null
    discriminator?: string | null
    avatar?: string | null
    email?: string | null
    premiumFrom?: Date | string | null
    premiumTo?: Date | string | null
    premiumPlan?: $Enums.PremiumPlan
    premiumPlus?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    playlists?: PlaylistUncheckedCreateNestedManyWithoutUserInput
    botInstance?: BotInstanceUncheckedCreateNestedOneWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    guildOwner?: GuildOwnerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    discriminator?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    premiumPlus?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playlists?: PlaylistUpdateManyWithoutUserNestedInput
    botInstance?: BotInstanceUpdateOneWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    guildOwner?: GuildOwnerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    discriminator?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    premiumPlus?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playlists?: PlaylistUncheckedUpdateManyWithoutUserNestedInput
    botInstance?: BotInstanceUncheckedUpdateOneWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    guildOwner?: GuildOwnerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    userId: string
    username?: string | null
    discriminator?: string | null
    avatar?: string | null
    email?: string | null
    premiumFrom?: Date | string | null
    premiumTo?: Date | string | null
    premiumPlan?: $Enums.PremiumPlan
    premiumPlus?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    discriminator?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    premiumPlus?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    discriminator?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    premiumPlus?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PremiumFeatureCreateInput = {
    id?: string
    name: string
    description?: string | null
    price?: number | null
    duration?: number | null
    features?: PremiumFeatureCreatefeaturesInput | string[]
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PremiumFeatureUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    price?: number | null
    duration?: number | null
    features?: PremiumFeatureCreatefeaturesInput | string[]
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PremiumFeatureUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    features?: PremiumFeatureUpdatefeaturesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PremiumFeatureUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    features?: PremiumFeatureUpdatefeaturesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PremiumFeatureCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    price?: number | null
    duration?: number | null
    features?: PremiumFeatureCreatefeaturesInput | string[]
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PremiumFeatureUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    features?: PremiumFeatureUpdatefeaturesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PremiumFeatureUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    duration?: NullableIntFieldUpdateOperationsInput | number | null
    features?: PremiumFeatureUpdatefeaturesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuildBotSettingsCreateInput = {
    id?: string
    botName?: string | null
    botAvatar?: string | null
    embedColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    guild: GuildCreateNestedOneWithoutGuildBotSettingsInput
  }

  export type GuildBotSettingsUncheckedCreateInput = {
    id?: string
    guildId: string
    botName?: string | null
    botAvatar?: string | null
    embedColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GuildBotSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    botName?: NullableStringFieldUpdateOperationsInput | string | null
    botAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    embedColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    guild?: GuildUpdateOneRequiredWithoutGuildBotSettingsNestedInput
  }

  export type GuildBotSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    botName?: NullableStringFieldUpdateOperationsInput | string | null
    botAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    embedColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuildBotSettingsCreateManyInput = {
    id?: string
    guildId: string
    botName?: string | null
    botAvatar?: string | null
    embedColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GuildBotSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    botName?: NullableStringFieldUpdateOperationsInput | string | null
    botAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    embedColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuildBotSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
    botName?: NullableStringFieldUpdateOperationsInput | string | null
    botAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    embedColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotInstanceCreateInput = {
    id?: string
    botToken: string
    applicationId: string
    botName?: string
    botStatus?: string
    botActivity?: string | null
    isActive?: boolean
    pm2ProcessId?: string | null
    defaultVolume?: number
    enable247?: boolean
    enableAutoplay?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBotInstanceInput
  }

  export type BotInstanceUncheckedCreateInput = {
    id?: string
    userId: string
    botToken: string
    applicationId: string
    botName?: string
    botStatus?: string
    botActivity?: string | null
    isActive?: boolean
    pm2ProcessId?: string | null
    defaultVolume?: number
    enable247?: boolean
    enableAutoplay?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BotInstanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    botToken?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    botName?: StringFieldUpdateOperationsInput | string
    botStatus?: StringFieldUpdateOperationsInput | string
    botActivity?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pm2ProcessId?: NullableStringFieldUpdateOperationsInput | string | null
    defaultVolume?: IntFieldUpdateOperationsInput | number
    enable247?: BoolFieldUpdateOperationsInput | boolean
    enableAutoplay?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBotInstanceNestedInput
  }

  export type BotInstanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    botToken?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    botName?: StringFieldUpdateOperationsInput | string
    botStatus?: StringFieldUpdateOperationsInput | string
    botActivity?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pm2ProcessId?: NullableStringFieldUpdateOperationsInput | string | null
    defaultVolume?: IntFieldUpdateOperationsInput | number
    enable247?: BoolFieldUpdateOperationsInput | boolean
    enableAutoplay?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotInstanceCreateManyInput = {
    id?: string
    userId: string
    botToken: string
    applicationId: string
    botName?: string
    botStatus?: string
    botActivity?: string | null
    isActive?: boolean
    pm2ProcessId?: string | null
    defaultVolume?: number
    enable247?: boolean
    enableAutoplay?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BotInstanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    botToken?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    botName?: StringFieldUpdateOperationsInput | string
    botStatus?: StringFieldUpdateOperationsInput | string
    botActivity?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pm2ProcessId?: NullableStringFieldUpdateOperationsInput | string | null
    defaultVolume?: IntFieldUpdateOperationsInput | number
    enable247?: BoolFieldUpdateOperationsInput | boolean
    enableAutoplay?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotInstanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    botToken?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    botName?: StringFieldUpdateOperationsInput | string
    botStatus?: StringFieldUpdateOperationsInput | string
    botActivity?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pm2ProcessId?: NullableStringFieldUpdateOperationsInput | string | null
    defaultVolume?: IntFieldUpdateOperationsInput | number
    enable247?: BoolFieldUpdateOperationsInput | boolean
    enableAutoplay?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    stripeSessionId?: string | null
    transactionId?: string | null
    amount: number
    currency?: string
    paymentMethod: string
    status?: string
    duration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPaymentsInput
    plan?: PlanCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    userId: string
    planId?: string | null
    stripeSessionId?: string | null
    transactionId?: string | null
    amount: number
    currency?: string
    paymentMethod: string
    status?: string
    duration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
    plan?: PlanUpdateOneWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    planId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    userId: string
    planId?: string | null
    stripeSessionId?: string | null
    transactionId?: string | null
    amount: number
    currency?: string
    paymentMethod: string
    status?: string
    duration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    planId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanCreateInput = {
    id?: string
    name: string
    description?: string | null
    price: number
    currency?: string
    durationDays?: number
    features?: PlanCreatefeaturesInput | string[]
    isActive?: boolean
    stripePriceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentCreateNestedManyWithoutPlanInput
  }

  export type PlanUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    price: number
    currency?: string
    durationDays?: number
    features?: PlanCreatefeaturesInput | string[]
    isActive?: boolean
    stripePriceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    payments?: PaymentUncheckedCreateNestedManyWithoutPlanInput
  }

  export type PlanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    durationDays?: IntFieldUpdateOperationsInput | number
    features?: PlanUpdatefeaturesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUpdateManyWithoutPlanNestedInput
  }

  export type PlanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    durationDays?: IntFieldUpdateOperationsInput | number
    features?: PlanUpdatefeaturesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    payments?: PaymentUncheckedUpdateManyWithoutPlanNestedInput
  }

  export type PlanCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    price: number
    currency?: string
    durationDays?: number
    features?: PlanCreatefeaturesInput | string[]
    isActive?: boolean
    stripePriceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    durationDays?: IntFieldUpdateOperationsInput | number
    features?: PlanUpdatefeaturesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    durationDays?: IntFieldUpdateOperationsInput | number
    features?: PlanUpdatefeaturesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuildOwnerCreateInput = {
    guildId: string
    user: UserCreateNestedOneWithoutGuildOwnerInput
  }

  export type GuildOwnerUncheckedCreateInput = {
    userId: string
    guildId: string
  }

  export type GuildOwnerUpdateInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutGuildOwnerNestedInput
  }

  export type GuildOwnerUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
  }

  export type GuildOwnerCreateManyInput = {
    userId: string
    guildId: string
  }

  export type GuildOwnerUpdateManyMutationInput = {
    guildId?: StringFieldUpdateOperationsInput | string
  }

  export type GuildOwnerUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    guildId?: StringFieldUpdateOperationsInput | string
  }

  export type AdminCreateInput = {
    id?: string
    email: string
    passwordHash: string
    isRegistered?: boolean
    isMaster?: boolean
    permissions?: AdminCreatepermissionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
  }

  export type AdminUncheckedCreateInput = {
    id?: string
    email: string
    passwordHash: string
    isRegistered?: boolean
    isMaster?: boolean
    permissions?: AdminCreatepermissionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
  }

  export type AdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
    isMaster?: BoolFieldUpdateOperationsInput | boolean
    permissions?: AdminUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
    isMaster?: BoolFieldUpdateOperationsInput | boolean
    permissions?: AdminUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdminCreateManyInput = {
    id?: string
    email: string
    passwordHash: string
    isRegistered?: boolean
    isMaster?: boolean
    permissions?: AdminCreatepermissionsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    lastLogin?: Date | string | null
  }

  export type AdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
    isMaster?: BoolFieldUpdateOperationsInput | boolean
    permissions?: AdminUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    isRegistered?: BoolFieldUpdateOperationsInput | boolean
    isMaster?: BoolFieldUpdateOperationsInput | boolean
    permissions?: AdminUpdatepermissionsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type OtpVerificationCreateInput = {
    id?: string
    email: string
    otp: string
    type: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type OtpVerificationUncheckedCreateInput = {
    id?: string
    email: string
    otp: string
    type: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type OtpVerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpVerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpVerificationCreateManyInput = {
    id?: string
    email: string
    otp: string
    type: string
    expiresAt: Date | string
    used?: boolean
    createdAt?: Date | string
  }

  export type OtpVerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OtpVerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    otp?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    used?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TrackListRelationFilter = {
    every?: TrackWhereInput
    some?: TrackWhereInput
    none?: TrackWhereInput
  }

  export type TrackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlaylistUserIdNameCompoundUniqueInput = {
    userId: string
    name: string
  }

  export type PlaylistCountOrderByAggregateInput = {
    playlist_id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    private?: SortOrder
  }

  export type PlaylistMaxOrderByAggregateInput = {
    playlist_id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    private?: SortOrder
  }

  export type PlaylistMinOrderByAggregateInput = {
    playlist_id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    private?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PlaylistScalarRelationFilter = {
    is?: PlaylistWhereInput
    isNot?: PlaylistWhereInput
  }

  export type TrackCountOrderByAggregateInput = {
    track_id?: SortOrder
    uri?: SortOrder
    name?: SortOrder
    encode?: SortOrder
    duration?: SortOrder
    playlist_id?: SortOrder
  }

  export type TrackAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type TrackMaxOrderByAggregateInput = {
    track_id?: SortOrder
    uri?: SortOrder
    name?: SortOrder
    encode?: SortOrder
    duration?: SortOrder
    playlist_id?: SortOrder
  }

  export type TrackMinOrderByAggregateInput = {
    track_id?: SortOrder
    uri?: SortOrder
    name?: SortOrder
    encode?: SortOrder
    duration?: SortOrder
    playlist_id?: SortOrder
  }

  export type TrackSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BotCountOrderByAggregateInput = {
    botId?: SortOrder
    voiceId?: SortOrder
  }

  export type BotMaxOrderByAggregateInput = {
    botId?: SortOrder
    voiceId?: SortOrder
  }

  export type BotMinOrderByAggregateInput = {
    botId?: SortOrder
    voiceId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumPremiumPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.PremiumPlan | EnumPremiumPlanFieldRefInput<$PrismaModel>
    in?: $Enums.PremiumPlan[] | ListEnumPremiumPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.PremiumPlan[] | ListEnumPremiumPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPremiumPlanFilter<$PrismaModel> | $Enums.PremiumPlan
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type GuildBotSettingsNullableScalarRelationFilter = {
    is?: GuildBotSettingsWhereInput | null
    isNot?: GuildBotSettingsWhereInput | null
  }

  export type GuildCountOrderByAggregateInput = {
    guildId?: SortOrder
    premiumFrom?: SortOrder
    premiumTo?: SortOrder
    premiumPlan?: SortOrder
    language?: SortOrder
    customBotName?: SortOrder
    embedColor?: SortOrder
    defaultVolume?: SortOrder
    enable247?: SortOrder
    enableAutoplay?: SortOrder
    enableVoteSkip?: SortOrder
    isActive?: SortOrder
    lastActivity?: SortOrder
    totalCommands?: SortOrder
    premiumSlots?: SortOrder
  }

  export type GuildAvgOrderByAggregateInput = {
    defaultVolume?: SortOrder
    totalCommands?: SortOrder
    premiumSlots?: SortOrder
  }

  export type GuildMaxOrderByAggregateInput = {
    guildId?: SortOrder
    premiumFrom?: SortOrder
    premiumTo?: SortOrder
    premiumPlan?: SortOrder
    language?: SortOrder
    customBotName?: SortOrder
    embedColor?: SortOrder
    defaultVolume?: SortOrder
    enable247?: SortOrder
    enableAutoplay?: SortOrder
    enableVoteSkip?: SortOrder
    isActive?: SortOrder
    lastActivity?: SortOrder
    totalCommands?: SortOrder
    premiumSlots?: SortOrder
  }

  export type GuildMinOrderByAggregateInput = {
    guildId?: SortOrder
    premiumFrom?: SortOrder
    premiumTo?: SortOrder
    premiumPlan?: SortOrder
    language?: SortOrder
    customBotName?: SortOrder
    embedColor?: SortOrder
    defaultVolume?: SortOrder
    enable247?: SortOrder
    enableAutoplay?: SortOrder
    enableVoteSkip?: SortOrder
    isActive?: SortOrder
    lastActivity?: SortOrder
    totalCommands?: SortOrder
    premiumSlots?: SortOrder
  }

  export type GuildSumOrderByAggregateInput = {
    defaultVolume?: SortOrder
    totalCommands?: SortOrder
    premiumSlots?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumPremiumPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PremiumPlan | EnumPremiumPlanFieldRefInput<$PrismaModel>
    in?: $Enums.PremiumPlan[] | ListEnumPremiumPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.PremiumPlan[] | ListEnumPremiumPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPremiumPlanWithAggregatesFilter<$PrismaModel> | $Enums.PremiumPlan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPremiumPlanFilter<$PrismaModel>
    _max?: NestedEnumPremiumPlanFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PlaylistListRelationFilter = {
    every?: PlaylistWhereInput
    some?: PlaylistWhereInput
    none?: PlaylistWhereInput
  }

  export type BotInstanceNullableScalarRelationFilter = {
    is?: BotInstanceWhereInput | null
    isNot?: BotInstanceWhereInput | null
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type GuildOwnerNullableScalarRelationFilter = {
    is?: GuildOwnerWhereInput | null
    isNot?: GuildOwnerWhereInput | null
  }

  export type PlaylistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    userId?: SortOrder
    username?: SortOrder
    discriminator?: SortOrder
    avatar?: SortOrder
    email?: SortOrder
    premiumFrom?: SortOrder
    premiumTo?: SortOrder
    premiumPlan?: SortOrder
    premiumPlus?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    userId?: SortOrder
    username?: SortOrder
    discriminator?: SortOrder
    avatar?: SortOrder
    email?: SortOrder
    premiumFrom?: SortOrder
    premiumTo?: SortOrder
    premiumPlan?: SortOrder
    premiumPlus?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    userId?: SortOrder
    username?: SortOrder
    discriminator?: SortOrder
    avatar?: SortOrder
    email?: SortOrder
    premiumFrom?: SortOrder
    premiumTo?: SortOrder
    premiumPlan?: SortOrder
    premiumPlus?: SortOrder
    stripeCustomerId?: SortOrder
    stripeSubscriptionId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type PremiumFeatureCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PremiumFeatureAvgOrderByAggregateInput = {
    price?: SortOrder
    duration?: SortOrder
  }

  export type PremiumFeatureMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PremiumFeatureMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    duration?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PremiumFeatureSumOrderByAggregateInput = {
    price?: SortOrder
    duration?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type GuildScalarRelationFilter = {
    is?: GuildWhereInput
    isNot?: GuildWhereInput
  }

  export type GuildBotSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    guildId?: SortOrder
    botName?: SortOrder
    botAvatar?: SortOrder
    embedColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuildBotSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    guildId?: SortOrder
    botName?: SortOrder
    botAvatar?: SortOrder
    embedColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GuildBotSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    guildId?: SortOrder
    botName?: SortOrder
    botAvatar?: SortOrder
    embedColor?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BotInstanceCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    botToken?: SortOrder
    applicationId?: SortOrder
    botName?: SortOrder
    botStatus?: SortOrder
    botActivity?: SortOrder
    isActive?: SortOrder
    pm2ProcessId?: SortOrder
    defaultVolume?: SortOrder
    enable247?: SortOrder
    enableAutoplay?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BotInstanceAvgOrderByAggregateInput = {
    defaultVolume?: SortOrder
  }

  export type BotInstanceMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    botToken?: SortOrder
    applicationId?: SortOrder
    botName?: SortOrder
    botStatus?: SortOrder
    botActivity?: SortOrder
    isActive?: SortOrder
    pm2ProcessId?: SortOrder
    defaultVolume?: SortOrder
    enable247?: SortOrder
    enableAutoplay?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BotInstanceMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    botToken?: SortOrder
    applicationId?: SortOrder
    botName?: SortOrder
    botStatus?: SortOrder
    botActivity?: SortOrder
    isActive?: SortOrder
    pm2ProcessId?: SortOrder
    defaultVolume?: SortOrder
    enable247?: SortOrder
    enableAutoplay?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BotInstanceSumOrderByAggregateInput = {
    defaultVolume?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type PlanNullableScalarRelationFilter = {
    is?: PlanWhereInput | null
    isNot?: PlanWhereInput | null
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    planId?: SortOrder
    stripeSessionId?: SortOrder
    transactionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
    duration?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    planId?: SortOrder
    stripeSessionId?: SortOrder
    transactionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    planId?: SortOrder
    stripeSessionId?: SortOrder
    transactionId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    status?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
    duration?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type PlanCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    durationDays?: SortOrder
    features?: SortOrder
    isActive?: SortOrder
    stripePriceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanAvgOrderByAggregateInput = {
    price?: SortOrder
    durationDays?: SortOrder
  }

  export type PlanMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    durationDays?: SortOrder
    isActive?: SortOrder
    stripePriceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    currency?: SortOrder
    durationDays?: SortOrder
    isActive?: SortOrder
    stripePriceId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanSumOrderByAggregateInput = {
    price?: SortOrder
    durationDays?: SortOrder
  }

  export type GuildOwnerCountOrderByAggregateInput = {
    userId?: SortOrder
    guildId?: SortOrder
  }

  export type GuildOwnerMaxOrderByAggregateInput = {
    userId?: SortOrder
    guildId?: SortOrder
  }

  export type GuildOwnerMinOrderByAggregateInput = {
    userId?: SortOrder
    guildId?: SortOrder
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isRegistered?: SortOrder
    isMaster?: SortOrder
    permissions?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isRegistered?: SortOrder
    isMaster?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    isRegistered?: SortOrder
    isMaster?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    lastLogin?: SortOrder
  }

  export type OtpVerificationCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    otp?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpVerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    otp?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type OtpVerificationMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    otp?: SortOrder
    type?: SortOrder
    expiresAt?: SortOrder
    used?: SortOrder
    createdAt?: SortOrder
  }

  export type UserCreateNestedOneWithoutPlaylistsInput = {
    create?: XOR<UserCreateWithoutPlaylistsInput, UserUncheckedCreateWithoutPlaylistsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlaylistsInput
    connect?: UserWhereUniqueInput
  }

  export type TrackCreateNestedManyWithoutPlaylistInput = {
    create?: XOR<TrackCreateWithoutPlaylistInput, TrackUncheckedCreateWithoutPlaylistInput> | TrackCreateWithoutPlaylistInput[] | TrackUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: TrackCreateOrConnectWithoutPlaylistInput | TrackCreateOrConnectWithoutPlaylistInput[]
    createMany?: TrackCreateManyPlaylistInputEnvelope
    connect?: TrackWhereUniqueInput | TrackWhereUniqueInput[]
  }

  export type TrackUncheckedCreateNestedManyWithoutPlaylistInput = {
    create?: XOR<TrackCreateWithoutPlaylistInput, TrackUncheckedCreateWithoutPlaylistInput> | TrackCreateWithoutPlaylistInput[] | TrackUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: TrackCreateOrConnectWithoutPlaylistInput | TrackCreateOrConnectWithoutPlaylistInput[]
    createMany?: TrackCreateManyPlaylistInputEnvelope
    connect?: TrackWhereUniqueInput | TrackWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutPlaylistsNestedInput = {
    create?: XOR<UserCreateWithoutPlaylistsInput, UserUncheckedCreateWithoutPlaylistsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlaylistsInput
    upsert?: UserUpsertWithoutPlaylistsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPlaylistsInput, UserUpdateWithoutPlaylistsInput>, UserUncheckedUpdateWithoutPlaylistsInput>
  }

  export type TrackUpdateManyWithoutPlaylistNestedInput = {
    create?: XOR<TrackCreateWithoutPlaylistInput, TrackUncheckedCreateWithoutPlaylistInput> | TrackCreateWithoutPlaylistInput[] | TrackUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: TrackCreateOrConnectWithoutPlaylistInput | TrackCreateOrConnectWithoutPlaylistInput[]
    upsert?: TrackUpsertWithWhereUniqueWithoutPlaylistInput | TrackUpsertWithWhereUniqueWithoutPlaylistInput[]
    createMany?: TrackCreateManyPlaylistInputEnvelope
    set?: TrackWhereUniqueInput | TrackWhereUniqueInput[]
    disconnect?: TrackWhereUniqueInput | TrackWhereUniqueInput[]
    delete?: TrackWhereUniqueInput | TrackWhereUniqueInput[]
    connect?: TrackWhereUniqueInput | TrackWhereUniqueInput[]
    update?: TrackUpdateWithWhereUniqueWithoutPlaylistInput | TrackUpdateWithWhereUniqueWithoutPlaylistInput[]
    updateMany?: TrackUpdateManyWithWhereWithoutPlaylistInput | TrackUpdateManyWithWhereWithoutPlaylistInput[]
    deleteMany?: TrackScalarWhereInput | TrackScalarWhereInput[]
  }

  export type TrackUncheckedUpdateManyWithoutPlaylistNestedInput = {
    create?: XOR<TrackCreateWithoutPlaylistInput, TrackUncheckedCreateWithoutPlaylistInput> | TrackCreateWithoutPlaylistInput[] | TrackUncheckedCreateWithoutPlaylistInput[]
    connectOrCreate?: TrackCreateOrConnectWithoutPlaylistInput | TrackCreateOrConnectWithoutPlaylistInput[]
    upsert?: TrackUpsertWithWhereUniqueWithoutPlaylistInput | TrackUpsertWithWhereUniqueWithoutPlaylistInput[]
    createMany?: TrackCreateManyPlaylistInputEnvelope
    set?: TrackWhereUniqueInput | TrackWhereUniqueInput[]
    disconnect?: TrackWhereUniqueInput | TrackWhereUniqueInput[]
    delete?: TrackWhereUniqueInput | TrackWhereUniqueInput[]
    connect?: TrackWhereUniqueInput | TrackWhereUniqueInput[]
    update?: TrackUpdateWithWhereUniqueWithoutPlaylistInput | TrackUpdateWithWhereUniqueWithoutPlaylistInput[]
    updateMany?: TrackUpdateManyWithWhereWithoutPlaylistInput | TrackUpdateManyWithWhereWithoutPlaylistInput[]
    deleteMany?: TrackScalarWhereInput | TrackScalarWhereInput[]
  }

  export type PlaylistCreateNestedOneWithoutTracksInput = {
    create?: XOR<PlaylistCreateWithoutTracksInput, PlaylistUncheckedCreateWithoutTracksInput>
    connectOrCreate?: PlaylistCreateOrConnectWithoutTracksInput
    connect?: PlaylistWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PlaylistUpdateOneRequiredWithoutTracksNestedInput = {
    create?: XOR<PlaylistCreateWithoutTracksInput, PlaylistUncheckedCreateWithoutTracksInput>
    connectOrCreate?: PlaylistCreateOrConnectWithoutTracksInput
    upsert?: PlaylistUpsertWithoutTracksInput
    connect?: PlaylistWhereUniqueInput
    update?: XOR<XOR<PlaylistUpdateToOneWithWhereWithoutTracksInput, PlaylistUpdateWithoutTracksInput>, PlaylistUncheckedUpdateWithoutTracksInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type GuildBotSettingsCreateNestedOneWithoutGuildInput = {
    create?: XOR<GuildBotSettingsCreateWithoutGuildInput, GuildBotSettingsUncheckedCreateWithoutGuildInput>
    connectOrCreate?: GuildBotSettingsCreateOrConnectWithoutGuildInput
    connect?: GuildBotSettingsWhereUniqueInput
  }

  export type GuildBotSettingsUncheckedCreateNestedOneWithoutGuildInput = {
    create?: XOR<GuildBotSettingsCreateWithoutGuildInput, GuildBotSettingsUncheckedCreateWithoutGuildInput>
    connectOrCreate?: GuildBotSettingsCreateOrConnectWithoutGuildInput
    connect?: GuildBotSettingsWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumPremiumPlanFieldUpdateOperationsInput = {
    set?: $Enums.PremiumPlan
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type GuildBotSettingsUpdateOneWithoutGuildNestedInput = {
    create?: XOR<GuildBotSettingsCreateWithoutGuildInput, GuildBotSettingsUncheckedCreateWithoutGuildInput>
    connectOrCreate?: GuildBotSettingsCreateOrConnectWithoutGuildInput
    upsert?: GuildBotSettingsUpsertWithoutGuildInput
    disconnect?: GuildBotSettingsWhereInput | boolean
    delete?: GuildBotSettingsWhereInput | boolean
    connect?: GuildBotSettingsWhereUniqueInput
    update?: XOR<XOR<GuildBotSettingsUpdateToOneWithWhereWithoutGuildInput, GuildBotSettingsUpdateWithoutGuildInput>, GuildBotSettingsUncheckedUpdateWithoutGuildInput>
  }

  export type GuildBotSettingsUncheckedUpdateOneWithoutGuildNestedInput = {
    create?: XOR<GuildBotSettingsCreateWithoutGuildInput, GuildBotSettingsUncheckedCreateWithoutGuildInput>
    connectOrCreate?: GuildBotSettingsCreateOrConnectWithoutGuildInput
    upsert?: GuildBotSettingsUpsertWithoutGuildInput
    disconnect?: GuildBotSettingsWhereInput | boolean
    delete?: GuildBotSettingsWhereInput | boolean
    connect?: GuildBotSettingsWhereUniqueInput
    update?: XOR<XOR<GuildBotSettingsUpdateToOneWithWhereWithoutGuildInput, GuildBotSettingsUpdateWithoutGuildInput>, GuildBotSettingsUncheckedUpdateWithoutGuildInput>
  }

  export type PlaylistCreateNestedManyWithoutUserInput = {
    create?: XOR<PlaylistCreateWithoutUserInput, PlaylistUncheckedCreateWithoutUserInput> | PlaylistCreateWithoutUserInput[] | PlaylistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlaylistCreateOrConnectWithoutUserInput | PlaylistCreateOrConnectWithoutUserInput[]
    createMany?: PlaylistCreateManyUserInputEnvelope
    connect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
  }

  export type BotInstanceCreateNestedOneWithoutUserInput = {
    create?: XOR<BotInstanceCreateWithoutUserInput, BotInstanceUncheckedCreateWithoutUserInput>
    connectOrCreate?: BotInstanceCreateOrConnectWithoutUserInput
    connect?: BotInstanceWhereUniqueInput
  }

  export type PaymentCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type GuildOwnerCreateNestedOneWithoutUserInput = {
    create?: XOR<GuildOwnerCreateWithoutUserInput, GuildOwnerUncheckedCreateWithoutUserInput>
    connectOrCreate?: GuildOwnerCreateOrConnectWithoutUserInput
    connect?: GuildOwnerWhereUniqueInput
  }

  export type PlaylistUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PlaylistCreateWithoutUserInput, PlaylistUncheckedCreateWithoutUserInput> | PlaylistCreateWithoutUserInput[] | PlaylistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlaylistCreateOrConnectWithoutUserInput | PlaylistCreateOrConnectWithoutUserInput[]
    createMany?: PlaylistCreateManyUserInputEnvelope
    connect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
  }

  export type BotInstanceUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<BotInstanceCreateWithoutUserInput, BotInstanceUncheckedCreateWithoutUserInput>
    connectOrCreate?: BotInstanceCreateOrConnectWithoutUserInput
    connect?: BotInstanceWhereUniqueInput
  }

  export type PaymentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type GuildOwnerUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<GuildOwnerCreateWithoutUserInput, GuildOwnerUncheckedCreateWithoutUserInput>
    connectOrCreate?: GuildOwnerCreateOrConnectWithoutUserInput
    connect?: GuildOwnerWhereUniqueInput
  }

  export type PlaylistUpdateManyWithoutUserNestedInput = {
    create?: XOR<PlaylistCreateWithoutUserInput, PlaylistUncheckedCreateWithoutUserInput> | PlaylistCreateWithoutUserInput[] | PlaylistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlaylistCreateOrConnectWithoutUserInput | PlaylistCreateOrConnectWithoutUserInput[]
    upsert?: PlaylistUpsertWithWhereUniqueWithoutUserInput | PlaylistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PlaylistCreateManyUserInputEnvelope
    set?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    disconnect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    delete?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    connect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    update?: PlaylistUpdateWithWhereUniqueWithoutUserInput | PlaylistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PlaylistUpdateManyWithWhereWithoutUserInput | PlaylistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PlaylistScalarWhereInput | PlaylistScalarWhereInput[]
  }

  export type BotInstanceUpdateOneWithoutUserNestedInput = {
    create?: XOR<BotInstanceCreateWithoutUserInput, BotInstanceUncheckedCreateWithoutUserInput>
    connectOrCreate?: BotInstanceCreateOrConnectWithoutUserInput
    upsert?: BotInstanceUpsertWithoutUserInput
    disconnect?: BotInstanceWhereInput | boolean
    delete?: BotInstanceWhereInput | boolean
    connect?: BotInstanceWhereUniqueInput
    update?: XOR<XOR<BotInstanceUpdateToOneWithWhereWithoutUserInput, BotInstanceUpdateWithoutUserInput>, BotInstanceUncheckedUpdateWithoutUserInput>
  }

  export type PaymentUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type GuildOwnerUpdateOneWithoutUserNestedInput = {
    create?: XOR<GuildOwnerCreateWithoutUserInput, GuildOwnerUncheckedCreateWithoutUserInput>
    connectOrCreate?: GuildOwnerCreateOrConnectWithoutUserInput
    upsert?: GuildOwnerUpsertWithoutUserInput
    disconnect?: GuildOwnerWhereInput | boolean
    delete?: GuildOwnerWhereInput | boolean
    connect?: GuildOwnerWhereUniqueInput
    update?: XOR<XOR<GuildOwnerUpdateToOneWithWhereWithoutUserInput, GuildOwnerUpdateWithoutUserInput>, GuildOwnerUncheckedUpdateWithoutUserInput>
  }

  export type PlaylistUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PlaylistCreateWithoutUserInput, PlaylistUncheckedCreateWithoutUserInput> | PlaylistCreateWithoutUserInput[] | PlaylistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PlaylistCreateOrConnectWithoutUserInput | PlaylistCreateOrConnectWithoutUserInput[]
    upsert?: PlaylistUpsertWithWhereUniqueWithoutUserInput | PlaylistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PlaylistCreateManyUserInputEnvelope
    set?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    disconnect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    delete?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    connect?: PlaylistWhereUniqueInput | PlaylistWhereUniqueInput[]
    update?: PlaylistUpdateWithWhereUniqueWithoutUserInput | PlaylistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PlaylistUpdateManyWithWhereWithoutUserInput | PlaylistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PlaylistScalarWhereInput | PlaylistScalarWhereInput[]
  }

  export type BotInstanceUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<BotInstanceCreateWithoutUserInput, BotInstanceUncheckedCreateWithoutUserInput>
    connectOrCreate?: BotInstanceCreateOrConnectWithoutUserInput
    upsert?: BotInstanceUpsertWithoutUserInput
    disconnect?: BotInstanceWhereInput | boolean
    delete?: BotInstanceWhereInput | boolean
    connect?: BotInstanceWhereUniqueInput
    update?: XOR<XOR<BotInstanceUpdateToOneWithWhereWithoutUserInput, BotInstanceUpdateWithoutUserInput>, BotInstanceUncheckedUpdateWithoutUserInput>
  }

  export type PaymentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type GuildOwnerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<GuildOwnerCreateWithoutUserInput, GuildOwnerUncheckedCreateWithoutUserInput>
    connectOrCreate?: GuildOwnerCreateOrConnectWithoutUserInput
    upsert?: GuildOwnerUpsertWithoutUserInput
    disconnect?: GuildOwnerWhereInput | boolean
    delete?: GuildOwnerWhereInput | boolean
    connect?: GuildOwnerWhereUniqueInput
    update?: XOR<XOR<GuildOwnerUpdateToOneWithWhereWithoutUserInput, GuildOwnerUpdateWithoutUserInput>, GuildOwnerUncheckedUpdateWithoutUserInput>
  }

  export type PremiumFeatureCreatefeaturesInput = {
    set: string[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PremiumFeatureUpdatefeaturesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type GuildCreateNestedOneWithoutGuildBotSettingsInput = {
    create?: XOR<GuildCreateWithoutGuildBotSettingsInput, GuildUncheckedCreateWithoutGuildBotSettingsInput>
    connectOrCreate?: GuildCreateOrConnectWithoutGuildBotSettingsInput
    connect?: GuildWhereUniqueInput
  }

  export type GuildUpdateOneRequiredWithoutGuildBotSettingsNestedInput = {
    create?: XOR<GuildCreateWithoutGuildBotSettingsInput, GuildUncheckedCreateWithoutGuildBotSettingsInput>
    connectOrCreate?: GuildCreateOrConnectWithoutGuildBotSettingsInput
    upsert?: GuildUpsertWithoutGuildBotSettingsInput
    connect?: GuildWhereUniqueInput
    update?: XOR<XOR<GuildUpdateToOneWithWhereWithoutGuildBotSettingsInput, GuildUpdateWithoutGuildBotSettingsInput>, GuildUncheckedUpdateWithoutGuildBotSettingsInput>
  }

  export type UserCreateNestedOneWithoutBotInstanceInput = {
    create?: XOR<UserCreateWithoutBotInstanceInput, UserUncheckedCreateWithoutBotInstanceInput>
    connectOrCreate?: UserCreateOrConnectWithoutBotInstanceInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutBotInstanceNestedInput = {
    create?: XOR<UserCreateWithoutBotInstanceInput, UserUncheckedCreateWithoutBotInstanceInput>
    connectOrCreate?: UserCreateOrConnectWithoutBotInstanceInput
    upsert?: UserUpsertWithoutBotInstanceInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBotInstanceInput, UserUpdateWithoutBotInstanceInput>, UserUncheckedUpdateWithoutBotInstanceInput>
  }

  export type UserCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    connect?: UserWhereUniqueInput
  }

  export type PlanCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<PlanCreateWithoutPaymentsInput, PlanUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: PlanCreateOrConnectWithoutPaymentsInput
    connect?: PlanWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentsInput
    upsert?: UserUpsertWithoutPaymentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPaymentsInput, UserUpdateWithoutPaymentsInput>, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type PlanUpdateOneWithoutPaymentsNestedInput = {
    create?: XOR<PlanCreateWithoutPaymentsInput, PlanUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: PlanCreateOrConnectWithoutPaymentsInput
    upsert?: PlanUpsertWithoutPaymentsInput
    disconnect?: PlanWhereInput | boolean
    delete?: PlanWhereInput | boolean
    connect?: PlanWhereUniqueInput
    update?: XOR<XOR<PlanUpdateToOneWithWhereWithoutPaymentsInput, PlanUpdateWithoutPaymentsInput>, PlanUncheckedUpdateWithoutPaymentsInput>
  }

  export type PlanCreatefeaturesInput = {
    set: string[]
  }

  export type PaymentCreateNestedManyWithoutPlanInput = {
    create?: XOR<PaymentCreateWithoutPlanInput, PaymentUncheckedCreateWithoutPlanInput> | PaymentCreateWithoutPlanInput[] | PaymentUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutPlanInput | PaymentCreateOrConnectWithoutPlanInput[]
    createMany?: PaymentCreateManyPlanInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutPlanInput = {
    create?: XOR<PaymentCreateWithoutPlanInput, PaymentUncheckedCreateWithoutPlanInput> | PaymentCreateWithoutPlanInput[] | PaymentUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutPlanInput | PaymentCreateOrConnectWithoutPlanInput[]
    createMany?: PaymentCreateManyPlanInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type PlanUpdatefeaturesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PaymentUpdateManyWithoutPlanNestedInput = {
    create?: XOR<PaymentCreateWithoutPlanInput, PaymentUncheckedCreateWithoutPlanInput> | PaymentCreateWithoutPlanInput[] | PaymentUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutPlanInput | PaymentCreateOrConnectWithoutPlanInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutPlanInput | PaymentUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: PaymentCreateManyPlanInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutPlanInput | PaymentUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutPlanInput | PaymentUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: XOR<PaymentCreateWithoutPlanInput, PaymentUncheckedCreateWithoutPlanInput> | PaymentCreateWithoutPlanInput[] | PaymentUncheckedCreateWithoutPlanInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutPlanInput | PaymentCreateOrConnectWithoutPlanInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutPlanInput | PaymentUpsertWithWhereUniqueWithoutPlanInput[]
    createMany?: PaymentCreateManyPlanInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutPlanInput | PaymentUpdateWithWhereUniqueWithoutPlanInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutPlanInput | PaymentUpdateManyWithWhereWithoutPlanInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGuildOwnerInput = {
    create?: XOR<UserCreateWithoutGuildOwnerInput, UserUncheckedCreateWithoutGuildOwnerInput>
    connectOrCreate?: UserCreateOrConnectWithoutGuildOwnerInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutGuildOwnerNestedInput = {
    create?: XOR<UserCreateWithoutGuildOwnerInput, UserUncheckedCreateWithoutGuildOwnerInput>
    connectOrCreate?: UserCreateOrConnectWithoutGuildOwnerInput
    upsert?: UserUpsertWithoutGuildOwnerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGuildOwnerInput, UserUpdateWithoutGuildOwnerInput>, UserUncheckedUpdateWithoutGuildOwnerInput>
  }

  export type AdminCreatepermissionsInput = {
    set: string[]
  }

  export type AdminUpdatepermissionsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumPremiumPlanFilter<$PrismaModel = never> = {
    equals?: $Enums.PremiumPlan | EnumPremiumPlanFieldRefInput<$PrismaModel>
    in?: $Enums.PremiumPlan[] | ListEnumPremiumPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.PremiumPlan[] | ListEnumPremiumPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPremiumPlanFilter<$PrismaModel> | $Enums.PremiumPlan
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumPremiumPlanWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PremiumPlan | EnumPremiumPlanFieldRefInput<$PrismaModel>
    in?: $Enums.PremiumPlan[] | ListEnumPremiumPlanFieldRefInput<$PrismaModel>
    notIn?: $Enums.PremiumPlan[] | ListEnumPremiumPlanFieldRefInput<$PrismaModel>
    not?: NestedEnumPremiumPlanWithAggregatesFilter<$PrismaModel> | $Enums.PremiumPlan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPremiumPlanFilter<$PrismaModel>
    _max?: NestedEnumPremiumPlanFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type UserCreateWithoutPlaylistsInput = {
    userId: string
    username?: string | null
    discriminator?: string | null
    avatar?: string | null
    email?: string | null
    premiumFrom?: Date | string | null
    premiumTo?: Date | string | null
    premiumPlan?: $Enums.PremiumPlan
    premiumPlus?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    botInstance?: BotInstanceCreateNestedOneWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    guildOwner?: GuildOwnerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPlaylistsInput = {
    userId: string
    username?: string | null
    discriminator?: string | null
    avatar?: string | null
    email?: string | null
    premiumFrom?: Date | string | null
    premiumTo?: Date | string | null
    premiumPlan?: $Enums.PremiumPlan
    premiumPlus?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    botInstance?: BotInstanceUncheckedCreateNestedOneWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    guildOwner?: GuildOwnerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPlaylistsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPlaylistsInput, UserUncheckedCreateWithoutPlaylistsInput>
  }

  export type TrackCreateWithoutPlaylistInput = {
    track_id?: string
    uri: string
    name: string
    encode: string
    duration: number
  }

  export type TrackUncheckedCreateWithoutPlaylistInput = {
    track_id?: string
    uri: string
    name: string
    encode: string
    duration: number
  }

  export type TrackCreateOrConnectWithoutPlaylistInput = {
    where: TrackWhereUniqueInput
    create: XOR<TrackCreateWithoutPlaylistInput, TrackUncheckedCreateWithoutPlaylistInput>
  }

  export type TrackCreateManyPlaylistInputEnvelope = {
    data: TrackCreateManyPlaylistInput | TrackCreateManyPlaylistInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPlaylistsInput = {
    update: XOR<UserUpdateWithoutPlaylistsInput, UserUncheckedUpdateWithoutPlaylistsInput>
    create: XOR<UserCreateWithoutPlaylistsInput, UserUncheckedCreateWithoutPlaylistsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPlaylistsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPlaylistsInput, UserUncheckedUpdateWithoutPlaylistsInput>
  }

  export type UserUpdateWithoutPlaylistsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    discriminator?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    premiumPlus?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    botInstance?: BotInstanceUpdateOneWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    guildOwner?: GuildOwnerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPlaylistsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    discriminator?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    premiumPlus?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    botInstance?: BotInstanceUncheckedUpdateOneWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    guildOwner?: GuildOwnerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type TrackUpsertWithWhereUniqueWithoutPlaylistInput = {
    where: TrackWhereUniqueInput
    update: XOR<TrackUpdateWithoutPlaylistInput, TrackUncheckedUpdateWithoutPlaylistInput>
    create: XOR<TrackCreateWithoutPlaylistInput, TrackUncheckedCreateWithoutPlaylistInput>
  }

  export type TrackUpdateWithWhereUniqueWithoutPlaylistInput = {
    where: TrackWhereUniqueInput
    data: XOR<TrackUpdateWithoutPlaylistInput, TrackUncheckedUpdateWithoutPlaylistInput>
  }

  export type TrackUpdateManyWithWhereWithoutPlaylistInput = {
    where: TrackScalarWhereInput
    data: XOR<TrackUpdateManyMutationInput, TrackUncheckedUpdateManyWithoutPlaylistInput>
  }

  export type TrackScalarWhereInput = {
    AND?: TrackScalarWhereInput | TrackScalarWhereInput[]
    OR?: TrackScalarWhereInput[]
    NOT?: TrackScalarWhereInput | TrackScalarWhereInput[]
    track_id?: StringFilter<"Track"> | string
    uri?: StringFilter<"Track"> | string
    name?: StringFilter<"Track"> | string
    encode?: StringFilter<"Track"> | string
    duration?: IntFilter<"Track"> | number
    playlist_id?: StringFilter<"Track"> | string
  }

  export type PlaylistCreateWithoutTracksInput = {
    playlist_id?: string
    name: string
    private?: boolean
    user: UserCreateNestedOneWithoutPlaylistsInput
  }

  export type PlaylistUncheckedCreateWithoutTracksInput = {
    playlist_id?: string
    userId: string
    name: string
    private?: boolean
  }

  export type PlaylistCreateOrConnectWithoutTracksInput = {
    where: PlaylistWhereUniqueInput
    create: XOR<PlaylistCreateWithoutTracksInput, PlaylistUncheckedCreateWithoutTracksInput>
  }

  export type PlaylistUpsertWithoutTracksInput = {
    update: XOR<PlaylistUpdateWithoutTracksInput, PlaylistUncheckedUpdateWithoutTracksInput>
    create: XOR<PlaylistCreateWithoutTracksInput, PlaylistUncheckedCreateWithoutTracksInput>
    where?: PlaylistWhereInput
  }

  export type PlaylistUpdateToOneWithWhereWithoutTracksInput = {
    where?: PlaylistWhereInput
    data: XOR<PlaylistUpdateWithoutTracksInput, PlaylistUncheckedUpdateWithoutTracksInput>
  }

  export type PlaylistUpdateWithoutTracksInput = {
    playlist_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutPlaylistsNestedInput
  }

  export type PlaylistUncheckedUpdateWithoutTracksInput = {
    playlist_id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
  }

  export type GuildBotSettingsCreateWithoutGuildInput = {
    id?: string
    botName?: string | null
    botAvatar?: string | null
    embedColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GuildBotSettingsUncheckedCreateWithoutGuildInput = {
    id?: string
    botName?: string | null
    botAvatar?: string | null
    embedColor?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type GuildBotSettingsCreateOrConnectWithoutGuildInput = {
    where: GuildBotSettingsWhereUniqueInput
    create: XOR<GuildBotSettingsCreateWithoutGuildInput, GuildBotSettingsUncheckedCreateWithoutGuildInput>
  }

  export type GuildBotSettingsUpsertWithoutGuildInput = {
    update: XOR<GuildBotSettingsUpdateWithoutGuildInput, GuildBotSettingsUncheckedUpdateWithoutGuildInput>
    create: XOR<GuildBotSettingsCreateWithoutGuildInput, GuildBotSettingsUncheckedCreateWithoutGuildInput>
    where?: GuildBotSettingsWhereInput
  }

  export type GuildBotSettingsUpdateToOneWithWhereWithoutGuildInput = {
    where?: GuildBotSettingsWhereInput
    data: XOR<GuildBotSettingsUpdateWithoutGuildInput, GuildBotSettingsUncheckedUpdateWithoutGuildInput>
  }

  export type GuildBotSettingsUpdateWithoutGuildInput = {
    id?: StringFieldUpdateOperationsInput | string
    botName?: NullableStringFieldUpdateOperationsInput | string | null
    botAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    embedColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GuildBotSettingsUncheckedUpdateWithoutGuildInput = {
    id?: StringFieldUpdateOperationsInput | string
    botName?: NullableStringFieldUpdateOperationsInput | string | null
    botAvatar?: NullableStringFieldUpdateOperationsInput | string | null
    embedColor?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlaylistCreateWithoutUserInput = {
    playlist_id?: string
    name: string
    private?: boolean
    tracks?: TrackCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistUncheckedCreateWithoutUserInput = {
    playlist_id?: string
    name: string
    private?: boolean
    tracks?: TrackUncheckedCreateNestedManyWithoutPlaylistInput
  }

  export type PlaylistCreateOrConnectWithoutUserInput = {
    where: PlaylistWhereUniqueInput
    create: XOR<PlaylistCreateWithoutUserInput, PlaylistUncheckedCreateWithoutUserInput>
  }

  export type PlaylistCreateManyUserInputEnvelope = {
    data: PlaylistCreateManyUserInput | PlaylistCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BotInstanceCreateWithoutUserInput = {
    id?: string
    botToken: string
    applicationId: string
    botName?: string
    botStatus?: string
    botActivity?: string | null
    isActive?: boolean
    pm2ProcessId?: string | null
    defaultVolume?: number
    enable247?: boolean
    enableAutoplay?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BotInstanceUncheckedCreateWithoutUserInput = {
    id?: string
    botToken: string
    applicationId: string
    botName?: string
    botStatus?: string
    botActivity?: string | null
    isActive?: boolean
    pm2ProcessId?: string | null
    defaultVolume?: number
    enable247?: boolean
    enableAutoplay?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BotInstanceCreateOrConnectWithoutUserInput = {
    where: BotInstanceWhereUniqueInput
    create: XOR<BotInstanceCreateWithoutUserInput, BotInstanceUncheckedCreateWithoutUserInput>
  }

  export type PaymentCreateWithoutUserInput = {
    id?: string
    stripeSessionId?: string | null
    transactionId?: string | null
    amount: number
    currency?: string
    paymentMethod: string
    status?: string
    duration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    plan?: PlanCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutUserInput = {
    id?: string
    planId?: string | null
    stripeSessionId?: string | null
    transactionId?: string | null
    amount: number
    currency?: string
    paymentMethod: string
    status?: string
    duration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutUserInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentCreateManyUserInputEnvelope = {
    data: PaymentCreateManyUserInput | PaymentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type GuildOwnerCreateWithoutUserInput = {
    guildId: string
  }

  export type GuildOwnerUncheckedCreateWithoutUserInput = {
    guildId: string
  }

  export type GuildOwnerCreateOrConnectWithoutUserInput = {
    where: GuildOwnerWhereUniqueInput
    create: XOR<GuildOwnerCreateWithoutUserInput, GuildOwnerUncheckedCreateWithoutUserInput>
  }

  export type PlaylistUpsertWithWhereUniqueWithoutUserInput = {
    where: PlaylistWhereUniqueInput
    update: XOR<PlaylistUpdateWithoutUserInput, PlaylistUncheckedUpdateWithoutUserInput>
    create: XOR<PlaylistCreateWithoutUserInput, PlaylistUncheckedCreateWithoutUserInput>
  }

  export type PlaylistUpdateWithWhereUniqueWithoutUserInput = {
    where: PlaylistWhereUniqueInput
    data: XOR<PlaylistUpdateWithoutUserInput, PlaylistUncheckedUpdateWithoutUserInput>
  }

  export type PlaylistUpdateManyWithWhereWithoutUserInput = {
    where: PlaylistScalarWhereInput
    data: XOR<PlaylistUpdateManyMutationInput, PlaylistUncheckedUpdateManyWithoutUserInput>
  }

  export type PlaylistScalarWhereInput = {
    AND?: PlaylistScalarWhereInput | PlaylistScalarWhereInput[]
    OR?: PlaylistScalarWhereInput[]
    NOT?: PlaylistScalarWhereInput | PlaylistScalarWhereInput[]
    playlist_id?: StringFilter<"Playlist"> | string
    userId?: StringFilter<"Playlist"> | string
    name?: StringFilter<"Playlist"> | string
    private?: BoolFilter<"Playlist"> | boolean
  }

  export type BotInstanceUpsertWithoutUserInput = {
    update: XOR<BotInstanceUpdateWithoutUserInput, BotInstanceUncheckedUpdateWithoutUserInput>
    create: XOR<BotInstanceCreateWithoutUserInput, BotInstanceUncheckedCreateWithoutUserInput>
    where?: BotInstanceWhereInput
  }

  export type BotInstanceUpdateToOneWithWhereWithoutUserInput = {
    where?: BotInstanceWhereInput
    data: XOR<BotInstanceUpdateWithoutUserInput, BotInstanceUncheckedUpdateWithoutUserInput>
  }

  export type BotInstanceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    botToken?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    botName?: StringFieldUpdateOperationsInput | string
    botStatus?: StringFieldUpdateOperationsInput | string
    botActivity?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pm2ProcessId?: NullableStringFieldUpdateOperationsInput | string | null
    defaultVolume?: IntFieldUpdateOperationsInput | number
    enable247?: BoolFieldUpdateOperationsInput | boolean
    enableAutoplay?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BotInstanceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    botToken?: StringFieldUpdateOperationsInput | string
    applicationId?: StringFieldUpdateOperationsInput | string
    botName?: StringFieldUpdateOperationsInput | string
    botStatus?: StringFieldUpdateOperationsInput | string
    botActivity?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    pm2ProcessId?: NullableStringFieldUpdateOperationsInput | string | null
    defaultVolume?: IntFieldUpdateOperationsInput | number
    enable247?: BoolFieldUpdateOperationsInput | boolean
    enableAutoplay?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
  }

  export type PaymentUpdateManyWithWhereWithoutUserInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutUserInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: StringFilter<"Payment"> | string
    userId?: StringFilter<"Payment"> | string
    planId?: StringNullableFilter<"Payment"> | string | null
    stripeSessionId?: StringNullableFilter<"Payment"> | string | null
    transactionId?: StringNullableFilter<"Payment"> | string | null
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    paymentMethod?: StringFilter<"Payment"> | string
    status?: StringFilter<"Payment"> | string
    duration?: IntFilter<"Payment"> | number
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type GuildOwnerUpsertWithoutUserInput = {
    update: XOR<GuildOwnerUpdateWithoutUserInput, GuildOwnerUncheckedUpdateWithoutUserInput>
    create: XOR<GuildOwnerCreateWithoutUserInput, GuildOwnerUncheckedCreateWithoutUserInput>
    where?: GuildOwnerWhereInput
  }

  export type GuildOwnerUpdateToOneWithWhereWithoutUserInput = {
    where?: GuildOwnerWhereInput
    data: XOR<GuildOwnerUpdateWithoutUserInput, GuildOwnerUncheckedUpdateWithoutUserInput>
  }

  export type GuildOwnerUpdateWithoutUserInput = {
    guildId?: StringFieldUpdateOperationsInput | string
  }

  export type GuildOwnerUncheckedUpdateWithoutUserInput = {
    guildId?: StringFieldUpdateOperationsInput | string
  }

  export type GuildCreateWithoutGuildBotSettingsInput = {
    guildId: string
    premiumFrom?: Date | string | null
    premiumTo?: Date | string | null
    premiumPlan?: $Enums.PremiumPlan
    language?: string
    customBotName?: string | null
    embedColor?: string | null
    defaultVolume?: number | null
    enable247?: boolean
    enableAutoplay?: boolean
    enableVoteSkip?: boolean
    isActive?: boolean
    lastActivity?: Date | string
    totalCommands?: number
    premiumSlots?: number
  }

  export type GuildUncheckedCreateWithoutGuildBotSettingsInput = {
    guildId: string
    premiumFrom?: Date | string | null
    premiumTo?: Date | string | null
    premiumPlan?: $Enums.PremiumPlan
    language?: string
    customBotName?: string | null
    embedColor?: string | null
    defaultVolume?: number | null
    enable247?: boolean
    enableAutoplay?: boolean
    enableVoteSkip?: boolean
    isActive?: boolean
    lastActivity?: Date | string
    totalCommands?: number
    premiumSlots?: number
  }

  export type GuildCreateOrConnectWithoutGuildBotSettingsInput = {
    where: GuildWhereUniqueInput
    create: XOR<GuildCreateWithoutGuildBotSettingsInput, GuildUncheckedCreateWithoutGuildBotSettingsInput>
  }

  export type GuildUpsertWithoutGuildBotSettingsInput = {
    update: XOR<GuildUpdateWithoutGuildBotSettingsInput, GuildUncheckedUpdateWithoutGuildBotSettingsInput>
    create: XOR<GuildCreateWithoutGuildBotSettingsInput, GuildUncheckedCreateWithoutGuildBotSettingsInput>
    where?: GuildWhereInput
  }

  export type GuildUpdateToOneWithWhereWithoutGuildBotSettingsInput = {
    where?: GuildWhereInput
    data: XOR<GuildUpdateWithoutGuildBotSettingsInput, GuildUncheckedUpdateWithoutGuildBotSettingsInput>
  }

  export type GuildUpdateWithoutGuildBotSettingsInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    language?: StringFieldUpdateOperationsInput | string
    customBotName?: NullableStringFieldUpdateOperationsInput | string | null
    embedColor?: NullableStringFieldUpdateOperationsInput | string | null
    defaultVolume?: NullableIntFieldUpdateOperationsInput | number | null
    enable247?: BoolFieldUpdateOperationsInput | boolean
    enableAutoplay?: BoolFieldUpdateOperationsInput | boolean
    enableVoteSkip?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCommands?: IntFieldUpdateOperationsInput | number
    premiumSlots?: IntFieldUpdateOperationsInput | number
  }

  export type GuildUncheckedUpdateWithoutGuildBotSettingsInput = {
    guildId?: StringFieldUpdateOperationsInput | string
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    language?: StringFieldUpdateOperationsInput | string
    customBotName?: NullableStringFieldUpdateOperationsInput | string | null
    embedColor?: NullableStringFieldUpdateOperationsInput | string | null
    defaultVolume?: NullableIntFieldUpdateOperationsInput | number | null
    enable247?: BoolFieldUpdateOperationsInput | boolean
    enableAutoplay?: BoolFieldUpdateOperationsInput | boolean
    enableVoteSkip?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    lastActivity?: DateTimeFieldUpdateOperationsInput | Date | string
    totalCommands?: IntFieldUpdateOperationsInput | number
    premiumSlots?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateWithoutBotInstanceInput = {
    userId: string
    username?: string | null
    discriminator?: string | null
    avatar?: string | null
    email?: string | null
    premiumFrom?: Date | string | null
    premiumTo?: Date | string | null
    premiumPlan?: $Enums.PremiumPlan
    premiumPlus?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    playlists?: PlaylistCreateNestedManyWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
    guildOwner?: GuildOwnerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBotInstanceInput = {
    userId: string
    username?: string | null
    discriminator?: string | null
    avatar?: string | null
    email?: string | null
    premiumFrom?: Date | string | null
    premiumTo?: Date | string | null
    premiumPlan?: $Enums.PremiumPlan
    premiumPlus?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    playlists?: PlaylistUncheckedCreateNestedManyWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
    guildOwner?: GuildOwnerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBotInstanceInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBotInstanceInput, UserUncheckedCreateWithoutBotInstanceInput>
  }

  export type UserUpsertWithoutBotInstanceInput = {
    update: XOR<UserUpdateWithoutBotInstanceInput, UserUncheckedUpdateWithoutBotInstanceInput>
    create: XOR<UserCreateWithoutBotInstanceInput, UserUncheckedCreateWithoutBotInstanceInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBotInstanceInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBotInstanceInput, UserUncheckedUpdateWithoutBotInstanceInput>
  }

  export type UserUpdateWithoutBotInstanceInput = {
    userId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    discriminator?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    premiumPlus?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playlists?: PlaylistUpdateManyWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
    guildOwner?: GuildOwnerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBotInstanceInput = {
    userId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    discriminator?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    premiumPlus?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playlists?: PlaylistUncheckedUpdateManyWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    guildOwner?: GuildOwnerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutPaymentsInput = {
    userId: string
    username?: string | null
    discriminator?: string | null
    avatar?: string | null
    email?: string | null
    premiumFrom?: Date | string | null
    premiumTo?: Date | string | null
    premiumPlan?: $Enums.PremiumPlan
    premiumPlus?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    playlists?: PlaylistCreateNestedManyWithoutUserInput
    botInstance?: BotInstanceCreateNestedOneWithoutUserInput
    guildOwner?: GuildOwnerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPaymentsInput = {
    userId: string
    username?: string | null
    discriminator?: string | null
    avatar?: string | null
    email?: string | null
    premiumFrom?: Date | string | null
    premiumTo?: Date | string | null
    premiumPlan?: $Enums.PremiumPlan
    premiumPlus?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    playlists?: PlaylistUncheckedCreateNestedManyWithoutUserInput
    botInstance?: BotInstanceUncheckedCreateNestedOneWithoutUserInput
    guildOwner?: GuildOwnerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPaymentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
  }

  export type PlanCreateWithoutPaymentsInput = {
    id?: string
    name: string
    description?: string | null
    price: number
    currency?: string
    durationDays?: number
    features?: PlanCreatefeaturesInput | string[]
    isActive?: boolean
    stripePriceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanUncheckedCreateWithoutPaymentsInput = {
    id?: string
    name: string
    description?: string | null
    price: number
    currency?: string
    durationDays?: number
    features?: PlanCreatefeaturesInput | string[]
    isActive?: boolean
    stripePriceId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanCreateOrConnectWithoutPaymentsInput = {
    where: PlanWhereUniqueInput
    create: XOR<PlanCreateWithoutPaymentsInput, PlanUncheckedCreateWithoutPaymentsInput>
  }

  export type UserUpsertWithoutPaymentsInput = {
    update: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
    create: XOR<UserCreateWithoutPaymentsInput, UserUncheckedCreateWithoutPaymentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPaymentsInput, UserUncheckedUpdateWithoutPaymentsInput>
  }

  export type UserUpdateWithoutPaymentsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    discriminator?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    premiumPlus?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playlists?: PlaylistUpdateManyWithoutUserNestedInput
    botInstance?: BotInstanceUpdateOneWithoutUserNestedInput
    guildOwner?: GuildOwnerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentsInput = {
    userId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    discriminator?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    premiumPlus?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playlists?: PlaylistUncheckedUpdateManyWithoutUserNestedInput
    botInstance?: BotInstanceUncheckedUpdateOneWithoutUserNestedInput
    guildOwner?: GuildOwnerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type PlanUpsertWithoutPaymentsInput = {
    update: XOR<PlanUpdateWithoutPaymentsInput, PlanUncheckedUpdateWithoutPaymentsInput>
    create: XOR<PlanCreateWithoutPaymentsInput, PlanUncheckedCreateWithoutPaymentsInput>
    where?: PlanWhereInput
  }

  export type PlanUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: PlanWhereInput
    data: XOR<PlanUpdateWithoutPaymentsInput, PlanUncheckedUpdateWithoutPaymentsInput>
  }

  export type PlanUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    durationDays?: IntFieldUpdateOperationsInput | number
    features?: PlanUpdatefeaturesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanUncheckedUpdateWithoutPaymentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    durationDays?: IntFieldUpdateOperationsInput | number
    features?: PlanUpdatefeaturesInput | string[]
    isActive?: BoolFieldUpdateOperationsInput | boolean
    stripePriceId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateWithoutPlanInput = {
    id?: string
    stripeSessionId?: string | null
    transactionId?: string | null
    amount: number
    currency?: string
    paymentMethod: string
    status?: string
    duration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateWithoutPlanInput = {
    id?: string
    userId: string
    stripeSessionId?: string | null
    transactionId?: string | null
    amount: number
    currency?: string
    paymentMethod: string
    status?: string
    duration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutPlanInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutPlanInput, PaymentUncheckedCreateWithoutPlanInput>
  }

  export type PaymentCreateManyPlanInputEnvelope = {
    data: PaymentCreateManyPlanInput | PaymentCreateManyPlanInput[]
    skipDuplicates?: boolean
  }

  export type PaymentUpsertWithWhereUniqueWithoutPlanInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutPlanInput, PaymentUncheckedUpdateWithoutPlanInput>
    create: XOR<PaymentCreateWithoutPlanInput, PaymentUncheckedCreateWithoutPlanInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutPlanInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutPlanInput, PaymentUncheckedUpdateWithoutPlanInput>
  }

  export type PaymentUpdateManyWithWhereWithoutPlanInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutPlanInput>
  }

  export type UserCreateWithoutGuildOwnerInput = {
    userId: string
    username?: string | null
    discriminator?: string | null
    avatar?: string | null
    email?: string | null
    premiumFrom?: Date | string | null
    premiumTo?: Date | string | null
    premiumPlan?: $Enums.PremiumPlan
    premiumPlus?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    playlists?: PlaylistCreateNestedManyWithoutUserInput
    botInstance?: BotInstanceCreateNestedOneWithoutUserInput
    payments?: PaymentCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGuildOwnerInput = {
    userId: string
    username?: string | null
    discriminator?: string | null
    avatar?: string | null
    email?: string | null
    premiumFrom?: Date | string | null
    premiumTo?: Date | string | null
    premiumPlan?: $Enums.PremiumPlan
    premiumPlus?: boolean
    stripeCustomerId?: string | null
    stripeSubscriptionId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    playlists?: PlaylistUncheckedCreateNestedManyWithoutUserInput
    botInstance?: BotInstanceUncheckedCreateNestedOneWithoutUserInput
    payments?: PaymentUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGuildOwnerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGuildOwnerInput, UserUncheckedCreateWithoutGuildOwnerInput>
  }

  export type UserUpsertWithoutGuildOwnerInput = {
    update: XOR<UserUpdateWithoutGuildOwnerInput, UserUncheckedUpdateWithoutGuildOwnerInput>
    create: XOR<UserCreateWithoutGuildOwnerInput, UserUncheckedCreateWithoutGuildOwnerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGuildOwnerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGuildOwnerInput, UserUncheckedUpdateWithoutGuildOwnerInput>
  }

  export type UserUpdateWithoutGuildOwnerInput = {
    userId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    discriminator?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    premiumPlus?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playlists?: PlaylistUpdateManyWithoutUserNestedInput
    botInstance?: BotInstanceUpdateOneWithoutUserNestedInput
    payments?: PaymentUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGuildOwnerInput = {
    userId?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    discriminator?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    premiumFrom?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumTo?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    premiumPlan?: EnumPremiumPlanFieldUpdateOperationsInput | $Enums.PremiumPlan
    premiumPlus?: BoolFieldUpdateOperationsInput | boolean
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSubscriptionId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    playlists?: PlaylistUncheckedUpdateManyWithoutUserNestedInput
    botInstance?: BotInstanceUncheckedUpdateOneWithoutUserNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TrackCreateManyPlaylistInput = {
    track_id?: string
    uri: string
    name: string
    encode: string
    duration: number
  }

  export type TrackUpdateWithoutPlaylistInput = {
    track_id?: StringFieldUpdateOperationsInput | string
    uri?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    encode?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
  }

  export type TrackUncheckedUpdateWithoutPlaylistInput = {
    track_id?: StringFieldUpdateOperationsInput | string
    uri?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    encode?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
  }

  export type TrackUncheckedUpdateManyWithoutPlaylistInput = {
    track_id?: StringFieldUpdateOperationsInput | string
    uri?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    encode?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
  }

  export type PlaylistCreateManyUserInput = {
    playlist_id?: string
    name: string
    private?: boolean
  }

  export type PaymentCreateManyUserInput = {
    id?: string
    planId?: string | null
    stripeSessionId?: string | null
    transactionId?: string | null
    amount: number
    currency?: string
    paymentMethod: string
    status?: string
    duration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlaylistUpdateWithoutUserInput = {
    playlist_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    tracks?: TrackUpdateManyWithoutPlaylistNestedInput
  }

  export type PlaylistUncheckedUpdateWithoutUserInput = {
    playlist_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
    tracks?: TrackUncheckedUpdateManyWithoutPlaylistNestedInput
  }

  export type PlaylistUncheckedUpdateManyWithoutUserInput = {
    playlist_id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    private?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PaymentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    plan?: PlanUpdateOneWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    planId?: NullableStringFieldUpdateOperationsInput | string | null
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyPlanInput = {
    id?: string
    userId: string
    stripeSessionId?: string | null
    transactionId?: string | null
    amount: number
    currency?: string
    paymentMethod: string
    status?: string
    duration?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutPlanInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    stripeSessionId?: NullableStringFieldUpdateOperationsInput | string | null
    transactionId?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}