import {atom} from "jotai";
import { atomWithStorage } from 'jotai/utils'

export const LOGGED_IN = atomWithStorage("loggedIn", localStorage.getItem("loggedIn"));
