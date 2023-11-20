import React, { useState } from 'react';
import ReadItems from './components/ReadItems';

const App = () => {
    const [refresh] = useState(false);


    return (
        <div>


            <ReadItems key={refresh} />
        </div>
    );
};

export default App;
