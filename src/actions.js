export const addStations = stations => (
    {
        type: 'ADD_STATIONS',
        stations
    }
);

export const storeHomeStation = station => (
    {
        type: 'STORE_HOME_STATION',
        station
    }
);


export const storeWorkStation = station => (
    {
        type: 'STORE_WORK_STATION',
        station
    }
);