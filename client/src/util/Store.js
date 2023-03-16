import {atom} from "jotai";
import { atomWithStorage } from 'jotai/utils'

// export const BASE_PATH = "http://localhost:8888/";

// export const LOGGED_IN = atomWithStorage("loggedIn", localStorage.getItem("loggedIn"));
export const LOGGED_IN = atomWithStorage("loggedIn", localStorage.getItem("loggedIn"));

export const CAR_SPECS = atomWithStorage("carSpecs", localStorage.getItem("carSpecs"));

export const RE_RENDER = atom(false);

export const ADD_ANNOUNCEMENT_DETAILS = atom({
    bodyType: undefined,
    brand: undefined,
    gearBox: undefined,
    fuel: undefined,
    year: undefined,
    km: undefined,
    vin: undefined,
    description:"",
    images:[],
    price: undefined,
    county: undefined,
    contact: undefined
});

export const FILTER_DETAILS = atom({
    bodyType: undefined,
    brand: undefined,
    gearBox: undefined,
    fuel: undefined,
    minYear: undefined,
    maxYear: undefined,
    minKm: undefined,
    maxKm: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    county: undefined,
});

export const FILTER_STORE = atomWithStorage("filterStore",{
    filter:false,
    bodyType: undefined,
    brand: undefined,
    gearBox: undefined,
    fuel: undefined,
    minYear: undefined,
    maxYear: undefined,
    minKm: undefined,
    maxKm: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    county: undefined,
});

