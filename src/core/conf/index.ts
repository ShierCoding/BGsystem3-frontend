import axios, { type AxiosResponse } from "axios";
import { MergeConfig, type Config, DefaultConfig } from "./type";
import { useError } from "@/stores/error";
import { nextTick } from "vue";

const configFilesCache: { [key: string]: Config } = {};

const request: {
    [key: string]: Promise<AxiosResponse>,
} = {};

export default async (configName: string = "config"): Promise<Config> => {
    let data = {};

    if (configFilesCache[configName]) {
        // console.log("using cache");
        return configFilesCache[configName];
    }

    if (request[configName] == undefined) {
        const req = axios(`/config/${configName}.json`);

        request[configName] = req;

        // console.log("build request");
    }

    try {

        data = (await request[configName]).data;

        const mergedConfig = MergeConfig(data);

        configFilesCache[configName] = mergedConfig;

        // console.log(configFilesCache);

        return mergedConfig;

    } catch {

        const error = useError();

        error.error = "CONFIG_DATA_EMPTY";

        await nextTick();

        return DefaultConfig();
    }

};