import { SVGProps } from 'react';
import { CustomDomComponent } from 'framer-motion';

interface projectDataType {
    name: string
    info: string
    link: string
    projectImageUrl: string
    techId: string
    technology: {
        techName: string
        techColor: string
        techIconUrl: string
    }
};

interface technologiesDataType {
    techName: string
    techColor: string
    techType: string
    techIconUrl: string   
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


export type {projectDataType, technologiesDataType, routeData, contactData};