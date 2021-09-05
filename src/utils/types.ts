export interface ResourceItem {
    name: string;
    id: string;
    actionIds: string[]
    description: string;
    path: string // "api/details/item_1"
    resourceType: string // "x type 1"
  }

  export interface Action {
    id: string,
    name: string;
  }
  
  export type ActionsHash = { [id: string]: Action }
  
  