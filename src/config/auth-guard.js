import { UserContext } from 'layout/MainLayout/MainLayout';
import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

export const PrivateRouteComponent = ({ child, roles, shouldAuthenticate }) => {
    const {userDetails} = useContext(UserContext);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (userDetails?.userRoles?.length && roles?.length) {
            setIsAuthorized(roles.includes(userDetails?.userRoles[0]));
        }
    }, [roles, userDetails])

    const checkAuthorities = () =>
        isAuthorized ? (
            child
        ) : (
            <div className="insufficient-authority">
                <div className="alert alert-danger">
                    You are not authorized to access this page.
                </div>
            </div>
        );

    // const renderRedirect = props => {
    //     if (!sessionHasBeenFetched) {
    //         return <div></div>;
    //     } else {
    //         return isAuthenticated ? (
    //             checkAuthorities(props)
    //         ) : (
    //             <Redirect
    //                 to={{
    //                     pathname: '/',
    //                     search: props.location.search,
    //                     state: { from: props.location },
    //                 }}
    //             />
    //         );
    //     }
    // };

    return <>{checkAuthorities()}</>
};

// export const hasAnyAuthority = (authorities: string[], hasAnyAuthorities: string[]) => {
//     if (authorities && authorities.length !== 0) {
//         if (hasAnyAuthorities.length === 0) {
//             return true;
//         }
//         return hasAnyAuthorities.some(auth => authorities.includes(auth));
//     }
//     return false;
// };

export default PrivateRouteComponent;
