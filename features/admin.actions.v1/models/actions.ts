/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import FeatureStatusLabel from "@wso2is/admin.extensions.v1/components/feature-gate/models/feature-gate";
import { ReactNode } from "react";

/**
 * Authentication Types.
 */
export enum AuthenticationType {
    NONE = "NONE",
    BASIC = "BASIC",
    API_KEY = "API_KEY",
    BEARER = "BEARER",
}

/**
 * Action Types.
 */
export enum ActionType {
    PRE_ISSUE_ACCESS_TOKEN = "PRE_ISSUE_ACCESS_TOKEN",
    PRE_UPDATE_PASSWORD = "PRE_UPDATE_PASSWORD",
    PRE_UPDATE_PROFILE = "PRE_UPDATE_PROFILE",
    PRE_REGISTRATION = "PRE_REGISTRATION"
}

/**
 * Action Status.
 */
enum ActionStatus {
    ACTIVE,
    INACTIVE
}

/**
 * Interface for the authentication type dropdown options.
 */
export interface AuthenticationTypeDropdownOption {
    key: AuthenticationType;
    text: string;
    value: AuthenticationType;
}

/**
 *  Action configuration.
 */
export interface ActionInterface {
    /**
     * Name of the Action.
     */
    name: string;
    /**
     * Description of the Action.
     */
    description?: string;
    /**
     * Endpoint configuration of the Action.
     */
    endpoint: EndpointInterface;
}

/**
 *  Endpoint configuration.
 */
interface EndpointInterface {
    /**
     * External endpoint.
     */
    uri: string;
    /**
     * Authentication configurations of the Action.
     */
    authentication: AuthenticationInterface;
}

/**
 *  Endpoint authentication configuration.
 */
interface AuthenticationInterface {
    /**
     * Authentication Type.
     */
    type: AuthenticationType;
    /**
     * Authentication properties.
     */
    properties: Partial<AuthenticationPropertiesInterface>;
}

/**
 * Authentication Properties.
 */
export interface AuthenticationPropertiesInterface {
    /**
     * Username auth property.
     */
    username: string;
    /**
     * Password auth property.
     */
    password: string;
    /**
     * Access Token auth property.
     */
    accessToken: string;
    /**
     * Header auth property.
     */
    header: string;
    /**
     * Value auth property.
     */
    value: string;
}

/**
 *  Action Basic Response.
 */
export interface ActionBasicResponseInterface {
    /**
     * ID of the Action.
     */
    id: string;
    /**
     * Type of the Action.
     */
    type: ActionType;
    /**
     * Name of the Action.
     */
    name: string;
    /**
     * Description of the Action.
     */
    description: string;
    /**
     * Status of the Action.
     */
    status: ActionStatus;
}

/**
 *  Action Response.
 */
export interface ActionResponseInterface extends ActionBasicResponseInterface {
    /**
     * Endpoint configuration of the Action.
     */
    endpoint: EndpointResponseInterface;
}

/**
 *  Endpoint Response.
 */
export interface EndpointResponseInterface {
    /**
     * External endpoint.
     */
    uri: string;
    /**
     * Authentication configurations of the Action.
     */
    authentication: {
        /**
         * Authentication Type.
         */
        type: AuthenticationType
    };
}

/**
 *  Action Update configuration.
 */
export interface ActionUpdateInterface {
    /**
     * Name of the Action.
     */
    name?: string;
    /**
     * Description of the Action.
     */
    description?: string;
    /**
     * Endpoint configuration of the Action.
     */
    endpoint?: Partial<EndpointInterface>;
}

/**
 *  Action Types Response.
 */
export interface ActionTypesResponseInterface {
    /**
     * Action Type.
     */
    type: string;
    /**
     * Display Name of the Action Type.
     */
    displayName: string;
    /**
     * Description of the Action Type.
     */
    description: string;
    /**
     * Count of the configured actions per Action Type.
     */
    count: number;
    /**
     * Uri for the given action type.
     */
    self: string;
}

/**
 *  Action Types Count Interface.
 */
export interface ActionTypesCountInterface {
    /**
     * Count of the configured actions of type PRE_ISSUE_ACCESS_TOKEN.
     */
    preIssueAccessToken?: number;
    /**
     * Count of the configured actions of type PRE_UPDATE_PASSWORD.
     */
    preUpdatePassword?: number;
    /**
     * Count of the configured actions of type PRE_UPDATE_PROFILE.
     */
    preUpdateProfile?: number;
    /**
     * Count of the configured actions of type PRE_REGISTRATION.
     */
    preRegistration?: number;
}

/**
 *  Action config form property Interface.
 */
export interface ActionConfigFormPropertyInterface {
    /**
     * Id of the Action.
     */
    id: string;
    /**
     * Name of the Action.
     */
    name: string;
    /**
     * Endpoint Uri of the Action.
     */
    endpointUri: string;
    /**
     * Endpoint Uri of the Action.
     */
    authenticationType: string;
    /**
     * Username property of basic authentication.
     */
    usernameAuthProperty?: string;
    /**
     * Password property of basic authentication.
     */
    passwordAuthProperty?: string;
    /**
     * Access Token property of bearer authentication.
     */
    accessTokenAuthProperty?: string;
    /**
     * Header property of apiKey authentication.
     */
    headerAuthProperty?: string;
    /**
     * Value property of apiKey authentication.
     */
    valueAuthProperty?: string;
}

/**
 *  Action Type card info Interface.
 */
export interface ActionTypeCardInterface {
    /**
     * Description of the Action type.
     */
    description: string,
    /**
     * Feature status label of the Action type.
     */
    featureStatusLabel: FeatureStatusLabel,
    /**
     * Heading of the Action type.
     */
    heading: string,
    /**
     * Icon of the Action type.
     */
    icon: ReactNode,
    /**
     * Identifier of the Action type.
     */
    identifier: string,
    /**
     * Route of the Action type.
     */
    route: string,
    /**
     * Disabled status of the Action type.
     */
    disabled?: boolean
}
