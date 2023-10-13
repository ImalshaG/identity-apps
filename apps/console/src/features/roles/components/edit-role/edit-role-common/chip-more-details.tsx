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

import { CardContent, Paper, Popover } from "@oxygen-ui/react";
import Chip from "@oxygen-ui/react/Chip";
import Grid from "@oxygen-ui/react/Grid";
import ListItemText from "@oxygen-ui/react/ListItemText";
import { IdentifiableComponentInterface } from "@wso2is/core/models";
import { AnimatedAvatar, AppAvatar, GenericIcon } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement } from "react";
import { getSidePanelIcons } from "../../../../core/configs/ui";

interface ChipMoreDetailsInterface extends IdentifiableComponentInterface {
    popoverAnchorEl: Element;
    onPopoverClose: () => void;
    primaryText: string;
    secondaryText?: string;
    userStore: string;
}

export const ChipMoreDetails: FunctionComponent<ChipMoreDetailsInterface> = (
    props: ChipMoreDetailsInterface
): ReactElement => {

    const {
        popoverAnchorEl,
        onPopoverClose,
        primaryText,
        secondaryText,
        userStore
    } = props;

    return (
        <Popover
            open={ !!popoverAnchorEl }
            anchorEl={ popoverAnchorEl }
            onClose={ () => onPopoverClose() }
            onMouseDown={ () => onPopoverClose() }
            anchorOrigin={ {
                horizontal: "left",
                vertical: "bottom"
            } }
            transformOrigin={ {
                horizontal: "left",
                vertical: "top"
            } }
            elevation={ 0 }
        >
            <Paper>
                <CardContent>
                    <Grid container alignItems="center" columnSpacing={ 2 }>
                        <Grid container alignItems="center" justifyContent="flex-start">
                            <Grid>
                                <AppAvatar
                                    image={ (
                                        <AnimatedAvatar
                                            name={ primaryText }
                                            size="mini"
                                        />
                                    ) }
                                    size="mini"

                                />
                            </Grid>
                            <Grid>
                                <ListItemText
                                    primary={ primaryText }
                                    secondary={ secondaryText ? secondaryText : null }
                                />
                            </Grid>
                        </Grid>
                        <Grid justifyContent="flex-end">
                            <Chip
                                icon={ (
                                    <GenericIcon
                                        inline
                                        size="default"
                                        transparent
                                        icon={ getSidePanelIcons().userStore }
                                        verticalAlign="middle"
                                    />
                                ) }
                                label={ userStore }
                            />
                        </Grid>
                    </Grid>
                </CardContent>

            </Paper>
        </Popover>
    );
};
