import ApiRoutes from "./routes";

export const handleApiResponse = call => call().then(r => r.json());

export const fetchStations = () => handleApiResponse(() => fetch(ApiRoutes.getStations()));
