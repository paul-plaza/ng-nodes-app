import { environment } from './../../environments/environment';
export class Configuration {
    public static server: string = localStorage.getItem("server-url") != null ? String(localStorage.getItem("server-url")) : environment.service;
}