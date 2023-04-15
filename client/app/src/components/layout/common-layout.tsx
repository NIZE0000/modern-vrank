import { ReactNode } from "react"

export type LayoutProps = {
    children: ReactNode
}

export default function HomeLayout({children}: LayoutProps): JSX.Element {
    return (<>{children}</>)
}