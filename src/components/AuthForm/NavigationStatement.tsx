import styles from '../../styles/form.module.scss'
import Link from 'next/link'

type Props = {
    question: string
    content: string
    href: string
}

function NavigationStatement({ question, content, href }: Props) {
    return (
        <>
            <div className={styles.navigation}>
                <span>{question}</span>
                <Link href={href} className={styles.link}>
                    {content}
                </Link>
            </div>
        </>
    )
}

export default NavigationStatement
