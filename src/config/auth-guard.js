import { UserContext } from 'layout/MainLayout/MainLayout';
import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

export const PrivateRouteComponent = ({ child, roles, shouldAuthenticate }) => {
    const { userDetails } = useContext(UserContext);
    const [isAuthorized, setIsAuthorized] = useState(null);


    useEffect(() => {
        if (userDetails?.userRoles?.length && roles?.length) {
            setIsAuthorized(roles.includes(userDetails?.userRoles[0]));
        } else {
            setIsAuthorized(false);
        }
    }, [roles, userDetails])



    const checkAuthorities = () =>
        isAuthorized === true ? (
            child
        ) : isAuthorized === false ? (
            <div className="insufficient-authority">
                <div className="alert alert-danger">
                    You are not authorized to access this page.
                </div>
            </div>
        ) : (
            <div>
                Loading...
            </div>
        );

    return <>{checkAuthorities()}</>
};


export default PrivateRouteComponent;
