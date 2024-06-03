interface projectDataType {
    name: string
    info: string
    proLanguage: string
    imageId: string
    imageUrl: string
    iconUrl: string
    link: string
};

interface routeData {
    name: string
    link: string
    iconUrl: React.SVGProps<SVGSVGElement>
}


export type {projectDataType, routeData};