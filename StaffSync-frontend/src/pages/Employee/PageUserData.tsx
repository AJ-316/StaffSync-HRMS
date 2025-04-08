import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

function PageUserData() {

    const location = useLocation();
    const searchParam = new URLSearchParams(location.search);

    const [id, setId] = useState<number>(-1);

    useEffect(() => {
        
        const paramId = searchParam.get("id");
        if(paramId) {
            setId(parseInt(paramId));
        }
        
    }, []);

    if(id == -1) {
        return (
            <>Invalid Data Id</>
        )
    }

    return (
        <div>
            {id}
        </div>
    )
}

export default PageUserData
