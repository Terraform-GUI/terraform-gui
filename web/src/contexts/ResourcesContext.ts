import {createContext} from "react";
import {Resource} from "../interfaces/Resource";

interface ResourcesContextInterface {
    resources: Resource[]
}

const ResourcesContext = createContext<ResourcesContextInterface>(undefined!);

export const ResourcesProvider = ResourcesContext.Provider;

export default ResourcesContext;
