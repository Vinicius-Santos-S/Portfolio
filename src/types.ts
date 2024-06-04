import { SVGProps } from 'react';
import { CustomDomComponent } from 'framer-motion';

interface projectDataType {
    name: string
    info: string
    proLanguage: string
    prolanguageColor: string
    imageId: string
    imageUrl: string
    iconUrl: string
    link: string
};

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


export type {projectDataType, routeData, contactData};