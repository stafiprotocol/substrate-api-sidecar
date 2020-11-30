/**
 * Object to house the values of all the configurable components for Sidecar.
 */
export interface ISidecarConfig {
	EXPRESS: ISidecarConfigExpress;
	SUBSTRATE: ISidecarConfigSubstrate;
	LOG: ISidecarConfigLog;
}

interface ISidecarConfigSubstrate {
	WS_URL: string;
	CUSTOM_TYPES: Record<string, string | Record<string, string> | {
		_enum: string[] | Record<string, string | null>;
	} | {
		_set: Record<string, number>;
	}>;
}

interface ISidecarConfigExpress {
	HOST: string;
	PORT: number;
}

interface ISidecarConfigLog {
	LEVEL: string;
	JSON: boolean;
	FILTER_RPC: boolean;
	STRIP_ANSI: boolean;
}
