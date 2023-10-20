import {action, makeObservable, observable} from 'mobx';import {LoadingEnum, NotificationType} from "../types/types";import { useState } from 'react'export class NotificationStore {    isLoading: LoadingEnum = LoadingEnum.fetching;    isLocalLoading: LoadingEnum = LoadingEnum.initial;    serverResponseText: string | undefined = '';    setIsLoading = (isLoading: LoadingEnum): void => {        this.isLoading = isLoading;    };    setLocalLoading = (isLoading: LoadingEnum): void => {        this.isLocalLoading = isLoading;    };    setServerErrorText = (text: string): void => {        this.serverResponseText = text;    };    setNotification = (        payload: {            serverResponse: string | undefined,        }    ): void => {        const {serverResponse} = payload        this.serverResponseText = serverResponse;        if (serverResponse) {         this.setServerErrorText(serverResponse)        }    };    constructor() {        makeObservable(this, {            isLoading: observable,            isLocalLoading: observable,            serverResponseText: observable,            setIsLoading: action,            setLocalLoading: action,            setNotification: action,        });    }}export default new NotificationStore();