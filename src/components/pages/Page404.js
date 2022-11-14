//Core
import { Link } from "react-router-dom";

//Components
import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>Page doesn't exist</p>
            <Link style={{color: '#09fa09', display: 'block', textAlign: 'center', fontWeight: 'bold', fontSize: 24, marginTop: 30}} to='/'>Back to main page</Link>
        </div>
    );
};

export default Page404;