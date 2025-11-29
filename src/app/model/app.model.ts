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

export interface StoredKorisnik{ 
    korisnickoIme: string; 
    ime?: string; 
    prezime?: string 
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

export interface Film{
    id:number,
    naziv: string;
    datumIzlaska:Date;
    trajanjeFilma:number;
    drzavaPorekla:string;
    zanr:Zanr;
    reziser:Reziser;
    uloge:Array<Uloga>;
}

export interface SuccessLogin{
    token:string;
	korisnickoIme:string;
	ime:string;
	prezime:string;
}

export interface SearchFilm {
  naziv?: string;
  reziserId?: number;
  zanrId?: number;
}

export interface CreateRecenzija{
    filmId: number;
    ocenaFilma: number;
    utisak: string;
}

export interface Recenzija{
    id:number;
    ocenaFilma:number;
    utisak:string;
    datumKreiranja:Date;
    film:Film
}

export interface CreateLista{
    id?:number;
    nazivListe: string;
    filmovi: number[];
}

export interface Lista {
  id: number;
  nazivListe: string;
  datumKreiranja: Date;
  filmovi: Film[];
}

export interface UpdateLista {
  nazivListe: string;
  filmovi: number[];
}

export interface ConfirmDialogData {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

