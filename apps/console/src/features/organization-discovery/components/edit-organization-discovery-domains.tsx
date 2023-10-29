/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com).
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

import Autocomplete, {
    AutocompleteRenderGetTagProps,
    AutocompleteRenderInputParams
} from "@oxygen-ui/react/Autocomplete";
import Chip from "@oxygen-ui/react/Chip";
import FormHelperText from "@oxygen-ui/react/FormHelperText";
import InputLabel from "@oxygen-ui/react/InputLabel";
import TextField from "@oxygen-ui/react/TextField";
import { hasRequiredScopes } from "@wso2is/core/helpers";
import {
    AlertLevels,
    IdentifiableComponentInterface,
    SBACInterface
} from "@wso2is/core/models";
import { addAlert } from "@wso2is/core/store";
import { FinalForm, FinalFormField, FormRenderProps, TextFieldAdapter } from "@wso2is/form";
import { ContentLoader, EmphasizedSegment, Hint, PrimaryButton } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement, SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { AppState, FeatureConfigInterface } from "../../core";
import updateOrganizationDiscoveryAttributes from "../api/update-organization-email-domains";
import {
    OrganizationDiscoveryAttributeDataInterface,
    OrganizationResponseInterface
} from "../models/organization-discovery";
import "./edit-organization-discovery-domains.scss";

/**
 * Props interface of {@link EditOrganizationDiscoveryDomains}
 */
export interface EditOrganizationDiscoveryDomainsPropsInterface
    extends SBACInterface<FeatureConfigInterface>,
        IdentifiableComponentInterface {
    /**
     * Organization info
     */
    organization: OrganizationResponseInterface;
    /**
     * Organization discovery info
     */
    organizationDiscoveryAttributes: OrganizationDiscoveryAttributeDataInterface;
    /**
     * Is read only view
     */
    isReadOnly: boolean;
    /**
     * Callback for when organization update
     */
    onOrganizationUpdate: (organizationId: string) => void;
}

/**
 * Interface for the edit organization email domains form values.
 */
interface EditOrganizationDiscoveryDomainsFormValuesInterface {
    /**
     * Organization name.
     */
    organizationName: string;
}

const FORM_ID: string = "edit-organization-discovery-domains-form";

/**
 * Organization overview component.
 *
 * @param props - Props injected to the component.
 * @returns Functional component.
 */
const EditOrganizationDiscoveryDomains: FunctionComponent<EditOrganizationDiscoveryDomainsPropsInterface> = (
    props: EditOrganizationDiscoveryDomainsPropsInterface
): ReactElement => {
    const {
        organization,
        organizationDiscoveryAttributes,
        isReadOnly,
        onOrganizationUpdate,
        ["data-componentid"]: componentId
    } = props;

    const { t } = useTranslation();

    const dispatch: Dispatch<any> = useDispatch();

    const allowedScopes: string = useSelector((state: AppState) => state?.auth?.allowedScopes);
    const featureConfig: FeatureConfigInterface = useSelector((state: AppState) => state.config.ui.features);

    const [ emailDomains, setEmailDomains ] = useState<string[]>([]);
    const [ hasScopes, setHasScopes ] = useState(false);

    const optionsArray: string[] = [];

    /**
     * Need to assign the default value explicitly overcome async issues in the `Autocomplete` component.
     * https://github.com/mui/material-ui/issues/31952#issuecomment-1077525449
     */
    useEffect(() => {
        setEmailDomains(organizationDiscoveryAttributes?.attributes[0]?.values ?? []);
    }, [ organizationDiscoveryAttributes ]);

    /**
     * Set the hasScopes state based on the feature config.
     */
    useEffect(() => {
        setHasScopes(
            !hasRequiredScopes(
                featureConfig?.organizationDiscovery,
                featureConfig?.organizationDiscovery?.scopes?.update,
                allowedScopes));
    }, [ featureConfig, organization ]);

    /**
     * Function to handle the form submit action.
     *
     * @param _values - Form values.
     */
    const handleSubmit = (_values?: EditOrganizationDiscoveryDomainsFormValuesInterface): void => {
        const emailDomainDiscoveryData: OrganizationDiscoveryAttributeDataInterface = {
            attributes: [
                {
                    type: "emailDomain",
                    values: emailDomains || organizationDiscoveryAttributes?.attributes[0]?.values
                }
            ]
        };

        updateOrganizationDiscoveryAttributes(organization.id, emailDomainDiscoveryData)
            .then(() => {
                dispatch(
                    addAlert({
                        description: t(
                            "console:manage.features.organizationDiscovery.notifications." +
                                "updateOrganizationDiscoveryAttributes.success.description"
                        ),
                        level: AlertLevels.SUCCESS,
                        message: t(
                            "console:manage.features.organizationDiscovery.notifications." +
                                "updateOrganizationDiscoveryAttributes.success.message"
                        )
                    })
                );

                onOrganizationUpdate(organization.id);
            })
            .catch(() => {
                dispatch(
                    addAlert({
                        description: t(
                            "console:manage.features.organizationDiscovery.notifications" +
                                ".updateOrganizationDiscoveryAttributes.error.description"
                        ),
                        level: AlertLevels.ERROR,
                        message: t(
                            "console:manage.features.organizationDiscovery.notifications" +
                                ".updateOrganizationDiscoveryAttributes.error.message"
                        )
                    })
                );
            });
    };

    if (!organization) {
        return <ContentLoader dimmer />;
    }

    return (
        <EmphasizedSegment padded="very" key={ organization?.id }>
            <FinalForm
                initialValues={ {
                    organizationName: organization.name
                } }
                keepDirtyOnReinitialize={ true }
                onSubmit={ (values: EditOrganizationDiscoveryDomainsFormValuesInterface) => {
                    handleSubmit(values);
                } }
                render={ ({ handleSubmit, submitting }: FormRenderProps) => {
                    return (
                        <form
                            id={ FORM_ID }
                            onSubmit={ handleSubmit }
                            className="edit-organization-discovery-domains-form"
                        >
                            <FinalFormField
                                fullWidth
                                FormControlProps={ {
                                    margin: "dense"
                                } }
                                ariaLabel="Organization name field"
                                required={ false }
                                data-componentid={ `${componentId}-form-organization-name-field` }
                                name="organizationName"
                                type="text"
                                label={ t(
                                    "console:manage.features.organizationDiscovery.edit." +
                                    "form.fields.organizationName.label"
                                ) }
                                helperText={ (
                                    <Hint>
                                        { t(
                                            "console:manage.features.organizationDiscovery.edit." +
                                            "form.fields.organizationName.hint"
                                        ) }
                                    </Hint>
                                ) }
                                component={ TextFieldAdapter }
                                InputProps={ {
                                    readOnly: true
                                } }
                            />
                            <Autocomplete
                                fullWidth
                                multiple
                                freeSolo
                                disableCloseOnSelect
                                size="small"
                                id="tags-filled"
                                options={ optionsArray.map((option: string) => option) }
                                value={ emailDomains }
                                renderTags={ (value: readonly string[], getTagProps: AutocompleteRenderGetTagProps) => {
                                    return value.map((option: string, index: number) => (
                                        <Chip
                                            key={ index }
                                            size="medium"
                                            label={ option }
                                            { ...getTagProps({ index }) }
                                        />
                                    ));
                                } }
                                renderInput={ (params: AutocompleteRenderInputParams) => (
                                    <>
                                        <InputLabel htmlFor="tags-filled" disableAnimation shrink={ false }>
                                            { t(
                                                "console:manage.features.organizationDiscovery.edit." +
                                                "form.fields.emailDomains.label"
                                            ) }
                                        </InputLabel>
                                        <TextField
                                            id="tags-filled"
                                            InputLabelProps={ {
                                                required: true
                                            } }
                                            { ...params }
                                            margin="dense"
                                            placeholder={ t(
                                                "console:manage.features.organizationDiscovery.edit." +
                                                "form.fields.emailDomains.placeholder"
                                            ) }
                                        />
                                    </>
                                ) }
                                onChange={ (_: SyntheticEvent<Element, Event>, value: string[]) => {
                                    setEmailDomains(value);
                                } }
                            />
                            <FormHelperText>
                                <Hint>
                                    { t(
                                        "console:manage.features.organizationDiscovery.edit." +
                                        "form.fields.emailDomains.hint"
                                    ) }
                                </Hint>
                            </FormHelperText>
                            { !isReadOnly && !hasScopes && (
                                <PrimaryButton
                                    data-componentid={ `${componentId}-form-save-button` }
                                    disabled={ submitting }
                                    loading={ submitting }
                                    type="submit"
                                    style={ { marginTop: "20px" } }
                                >
                                    { t("common:update") }
                                </PrimaryButton>
                            ) }
                        </form>
                    );
                } }
            />
        </EmphasizedSegment>
    );
};

/**
 * Props interface of {@link EditOrganizationDiscoveryDomains}
 */
EditOrganizationDiscoveryDomains.defaultProps = {
    "data-componentid": "edit-organization-discovery-domains"
};

export default EditOrganizationDiscoveryDomains;