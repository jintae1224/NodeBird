import propTypes from 'prop-types'

AppLayout.propTypes = {
    children: propTypes.node.isRequired,
}

const AppLayout = ({children}) => {
    return(
        <div>
            <div>공통메뉴</div>
            {children}
        </div>
    );
}

export default AppLayout