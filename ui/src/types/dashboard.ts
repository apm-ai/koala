
export interface DashboardDTO {
    redirectUri?: string;
    dashboard: DashboardDataDTO;
    meta: DashboardMeta;
  }

  export interface DashboardDataDTO {
    title: string;
  }
  

  export interface DashboardMeta {
    canSave?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    canShare?: boolean;
    canStar?: boolean;
    canAdmin?: boolean;
    url?: string;
    folderId?: number;
    fromExplore?: boolean;
    canMakeEditable?: boolean;
    submenuEnabled?: boolean;
    provisioned?: boolean;
    provisionedExternalId?: string;
    focusPanelId?: number;
    isStarred?: boolean;
    showSettings?: boolean;
    expires?: string;
    isSnapshot?: boolean;
    folderTitle?: string;
    folderUrl?: string;
    created?: string;
    createdBy?: string;
    updated?: string;
    updatedBy?: string;
  }