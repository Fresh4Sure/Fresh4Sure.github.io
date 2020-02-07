/******************/
/* manage loading */
/******************/

/**
 * 
 * Renvoie une promesse qui se résout quand toutes les images passées en paramètres ainsi
 * que toutes les balises <img> de la page sont chargées.
 *
 * @param {Array} imgs images chargées depuis le CSS
 * @param {Int} tpsMin Temps [ms] minimum avant résolution de la promesse 
 * @return {Promise} 
 */
function imgLoader(imgs, tpsMin = 1000){

    /* les promesses de chaque <img> seront ajoutées au tableau proms */
    const proms = [];

    imgs.forEach(img => {
        const image = new Image();
        image.src = img;

        /* … la promesse est crée */
        const prom = new Promise(resolve => {

            /* la promesse est résolue lors des events onload ou onerror */
            image.addEventListener('load', () => resolve() );
            image.addEventListener('error', () => resolve() );

        });

        proms.push(prom);

    });

    /* délais minimum pour l'animation de loading */
    const delayMin = new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, tpsMin);
    });

    window.addEventListener('DOMContentLoaded', () => {

        /* pour chaque <img> de la page … */
        Array.from(document.getElementsByTagName('img')).forEach(img => {

            /* … si elle n'est pas déjà chargée … */
            if(!img.complete){

                /* … la promesse est crée */
                const prom = new Promise(resolve => {

                    /* la promesse est résolue lors des events onload ou onerror */
                    img.addEventListener('load', () => resolve() );
                    img.addEventListener('error', () => resolve() );

                });

                /* la promesse est ajoutée à proms */
                proms.push(prom);
            }

        });

    });

    
    /* ajout du délais minimum à la liste de promesses */
    proms.push(delayMin);

    return Promise.all(proms);

}