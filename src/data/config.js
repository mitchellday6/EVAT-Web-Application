
export const ConfigData = ()=>{

    const MODE = {
        DEV: "dev",
        PROD: "prod",
    }
    
    const mode = MODE.DEV;
    
    const backend = {
        ipAddress: "https://evat.ddns.net",
        port: 443,
        devIPAddress: "http://10.0.2.2",
        devPort: 8080,
    }

    const backendURL = (mode)=>{
        return mode === MODE.DEV 
        ? `${backend.devIPAddress}:${backend.devPort}` 
        : `${backend.ipAddress}:${backend.port}`
    }

    return {
        backend,
        MODE,
        backendURL,
        mode
    }
} 

