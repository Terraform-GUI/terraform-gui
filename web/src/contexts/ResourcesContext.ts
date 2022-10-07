import {createContext} from "react";
import {IResource} from "../interfaces/IResource";

interface ResourcesContextInterface {
    resources: IResource[]
}

const ResourcesContext = createContext<ResourcesContextInterface>(undefined!);

export const ResourcesProvider = ResourcesContext.Provider;

export default ResourcesContext;
