import PropTypes from 'prop-types'
import 'antd/dist/antd.css'

const App = ({Component}) => {
    return(
        <Component />
    )
}

App.propsTypes = {
    Component : PropTypes.elementType.isRequired,
}

export default App;