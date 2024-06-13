import { SVGProps } from 'react';
import { CustomDomComponent } from 'framer-motion';

interface projectDataType {
    name: string
    info: string
    proLanguage: string
    prolanguageColor: string
    link: string
};
interface clientSideProjectDataType extends projectDataType {
    proLanguageIconUrl?: string
    projectImageUrl?: string
}

interface routeData {
    name: string
    link: string
    iconSvg: CustomDomComponent<SVGProps<SVGSVGElement>>
}

interface contactData {
    name: string
    link: string
    iconSvg: CustomDomComponent<SVGProps<SVGSVGElement>>
}


export type {projectDataType, clientSideProjectDataType, routeData, contactData};