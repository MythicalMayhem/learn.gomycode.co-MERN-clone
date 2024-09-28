const Locked = () => <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="locked"><path d="M2.25 5V3.5C2.25 1.85938 3.58594 0.5 5.25 0.5C6.89062 0.5 8.25 1.85938 8.25 3.5V5H9C9.82031 5 10.5 5.67969 10.5 6.5V11C10.5 11.8438 9.82031 12.5 9 12.5H1.5C0.65625 12.5 0 11.8438 0 11V6.5C0 5.67969 0.65625 5 1.5 5H2.25ZM3.375 5H7.125V3.5C7.125 2.46875 6.28125 1.625 5.25 1.625C4.19531 1.625 3.375 2.46875 3.375 3.5V5ZM1.125 11C1.125 11.2109 1.28906 11.375 1.5 11.375H9C9.1875 11.375 9.375 11.2109 9.375 11V6.5C9.375 6.3125 9.1875 6.125 9 6.125H1.5C1.28906 6.125 1.125 6.3125 1.125 6.5V11Z" fill="#B9BDC1"></path></svg>
const Unlocked = () => <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="unlocked"><path d="M8.25 5H9C9.82031 5 10.5 5.67969 10.5 6.5V11C10.5 11.8438 9.82031 12.5 9 12.5H1.5C0.65625 12.5 0 11.8438 0 11V6.5C0 5.67969 0.65625 5 1.5 5H7.125V3.5C7.125 1.85938 8.46094 0.5 10.125 0.5C11.7656 0.5 13.125 1.85938 13.125 3.5V5.1875C13.125 5.51562 12.8672 5.75 12.5625 5.75C12.2344 5.75 12 5.51562 12 5.1875V3.5C12 2.46875 11.1562 1.625 10.125 1.625C9.07031 1.625 8.25 2.46875 8.25 3.5V5ZM1.125 6.5V11C1.125 11.2109 1.28906 11.375 1.5 11.375H9C9.1875 11.375 9.375 11.2109 9.375 11V6.5C9.375 6.3125 9.1875 6.125 9 6.125H1.5C1.28906 6.125 1.125 6.3125 1.125 6.5Z" fill="#B9BDC1"></path></svg>
function Aside() {
    return (
        <aside className="aside">
            <img src="images/certif.png" alt="" />
            <p className="course-name">Introduction to Artificial Intelligence</p>

            <div className="dates"><span className="from"><Unlocked /><span>23 octobre 2021</span></span>
                <span className="to"> <Locked /><span>23 octobre 2021</span></span></div>
        </aside>);
}

export default Aside;