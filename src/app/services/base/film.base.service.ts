/* 
* Generated by
* 
*      _____ _          __  __      _     _
*     / ____| |        / _|/ _|    | |   | |
*    | (___ | | ____ _| |_| |_ ___ | | __| | ___ _ __
*     \___ \| |/ / _` |  _|  _/ _ \| |/ _` |/ _ \ '__|
*     ____) |   < (_| | | | || (_) | | (_| |  __/ |
*    |_____/|_|\_\__,_|_| |_| \___/|_|\__,_|\___|_|
*
* The code generator that works in many programming languages
*
*			https://www.skaffolder.com
*
*
* You can generate the code from the command-line
*       https://npmjs.com/package/skaffolder-cli
*
*       npm install -g skaffodler-cli
*
*   *   *   *   *   *   *   *   *   *   *   *   *   *   *   *
*
* To remove this comment please upgrade your plan here: 
*      https://app.skaffolder.com/#!/upgrade
*
* Or get up to 70% discount sharing your unique link:
*       https://app.skaffolder.com/#!/register?friend=5d570849b87f357c3c4a60b5
*
* You will get 10% discount for each one of your friends
* 
*/
/**
 *
 *
  _____                      _              _ _ _     _   _     _        __ _ _
 |  __ \                    | |            | (_) |   | | | |   (_)      / _(_) |
 | |  | | ___    _ __   ___ | |_    ___  __| |_| |_  | |_| |__  _ ___  | |_ _| | ___
 | |  | |/ _ \  | '_ \ / _ \| __|  / _ \/ _` | | __| | __| '_ \| / __| |  _| | |/ _ \
 | |__| | (_) | | | | | (_) | |_  |  __/ (_| | | |_  | |_| | | | \__ \ | | | | |  __/
 |_____/ \___/  |_| |_|\___/ \__|  \___|\__,_|_|\__|  \__|_| |_|_|___/ |_| |_|_|\___|

 * DO NOT EDIT THIS FILE!!
 *
 *  FOR CUSTOMIZE filmBaseService PLEASE EDIT ../film.service.ts
 *
 *  -- THIS FILE WILL BE OVERWRITTEN ON THE NEXT SKAFFOLDER'S CODE GENERATION --
 *
 */
 // DEPENDENCIES
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

// CONFIG
import { environment } from '../../../environments/environment';

// MODEL
import { Film } from '../../domain/manage_film_example_db/film';

/**
 * THIS SERVICE MAKE HTTP REQUEST TO SERVER, FOR CUSTOMIZE IT EDIT ../Film.service.ts
 */

/*
 * SCHEMA DB Film
 *
	{
		genre: {
			type: 'String',
			enum : ["Action", "Crime", "Fantasy", "Horror"]
		},
		title: {
			type: 'String',
			required : true
		},
		year: {
			type: 'Number'
		},
		//RELATIONS
		//EXTERNAL RELATIONS
		cast: [{
			type: Schema.ObjectId,
			ref : "Film"
		}],
		filmMaker: {
			type: Schema.ObjectId,
			required : true,
			ref : "Film"
		},
	}
 *
 */
@Injectable()
export class FilmBaseService {

    private filmCollection: AngularFirestoreCollection<Film>;
    constructor(
        private afs: AngularFirestore,
        private fns: AngularFireFunctions
    ) {
        this.filmCollection = afs.collection<Film>('film');
    }


    // CRUD METHODS

    /**
    * FilmService.create
    *   @description CRUD ACTION create
    *
    */
    create(item: Film): Promise<DocumentReference> {
        return this.filmCollection.add(item);
    }

    /**
    * FilmService.delete
    *   @description CRUD ACTION delete
    *   @param ObjectId id Id
    *
    */
    remove(id: string) {
        const itemDoc: AngularFirestoreDocument<any> = this.filmCollection.doc(id);
        itemDoc.delete();
    }

    /**
    * FilmService.findBycast
    *   @description CRUD ACTION findBycast
    *   @param Objectid key Id della risorsa cast da cercare
    *
    */
    findByCast(id: string): Observable<any[]> {
        return this.afs.collection('film', ref => ref.where('cast', 'array-contains', id)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Film;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    /**
    * FilmService.findByfilmMaker
    *   @description CRUD ACTION findByfilmMaker
    *   @param Objectid key Id della risorsa filmMaker da cercare
    *
    */
    findByFilmMaker(id: string): Observable<any[]> {
        return this.afs.collection('film', ref => ref.where('filmMaker', '==', id)).snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Film;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    /**
    * FilmService.get
    *   @description CRUD ACTION get
    *   @param ObjectId id Id 
    *
    */
    get(id: string): AngularFirestoreDocument<Film> {
        return this.afs.doc<Film>('film/' + id);
    }

    /**
    * FilmService.list
    *   @description CRUD ACTION list
    *
    */
    list(): Observable<Film[]> {
        return this.afs.collection('film').snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Film;
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    /**
    * FilmService.update
    *   @description CRUD ACTION update
    *   @param ObjectId id Id
    *
    */
    update(itemDoc: AngularFirestoreDocument<Film>, item: Film): Promise<void> {
        return itemDoc.update(item);
    }


    // Custom APIs

}
