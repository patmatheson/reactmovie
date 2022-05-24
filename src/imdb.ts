
export interface ImdbInfo {
    id: string;
    name: string;
    poster: string;
    actors: string;
    nominator?: string;
}

export async function imdbLookup (imdbId: string, nominator: string): Promise<ImdbInfo>{
    return new Promise ((resolve, reject) => {

        function addScript(src: string) {
            var s = document.createElement('script');
            s.src = src; document.head.appendChild(s);
        }
        console.log("Lookat me I'm in IMDB lookup!")
        const callbackName = 'imdb$' + imdbId;

        (window as { [key: string]: any })[callbackName] = function (results : any) {
            console.log(results)

            /* example response from jsonp {
            "v":1,
            "q":"tt1211837",
            "d":[
                {
                    "l":"Doctor Strange",
                    "id":"tt1211837",
                    "s":"Benedict Cumberbatch, Chiwetel Ejiofor",
                    "y":2016,
                    "q":"feature",
                    "i":[
                        "https://m.media-amazon.com/images/M/MV5BNjgwNzAzNjk1Nl5BMl5BanBnXkFtZTgwMzQ2NjI1OTE@._V1_.jpg",
                        1382,
                        2048
                    ]
                }
            ]
            */

            const data = results.d[0];

            resolve({
                id: imdbId,
                name: data.l,
                poster: data.i[0],
                actors: data.s,
                nominator: nominator
            })
        };
        addScript(`https://sg.media-imdb.com/suggests/t/${imdbId}.json`);
    });
}

/**/