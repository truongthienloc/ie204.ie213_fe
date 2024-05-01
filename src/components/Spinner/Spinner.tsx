import styles from '~/styles/spinner.module.scss'
const Spinner = () => {
    return (
        <div className={styles.spinner}>
            <div className={styles.spinnerInner}></div>
        </div>
    )
}
export default Spinner
