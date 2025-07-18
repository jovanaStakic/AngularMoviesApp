export interface LoginKorisnik{
    korisnickoIme: string;
    sifra: string;
}
export interface RegisterKorisnik{
    korisnickoIme: string;
    sifra: string;
    ime: string;
    prezime: string;
}

export interface Reziser{
    id: number;
    imePrezime: string;
    pdatumRodjenja: Date;
    drzavaPorekla: string; 
}

export interface Glumac{
    id: number;
    imePrezime: string;
    datumRodjenja: Date;
    drzavaPorekla: string;
}

export interface Zanr{
    id: number;
    naziv: string;
}
export interface Uloga{
    glumacId:number;
    nazivUloge:string;
}
export interface CreateFilm{
    naziv: string;
    datumIzlaska:Date;
    trajanjeFilma:number;
    drzavaPorekla:string;
    zanrId:number;
    reziserId:number;
    uloge:Array<Uloga>;
}