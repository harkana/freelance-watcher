import axios from "axios";
import qs from "qs";

(async () => {
    const response = await axios({
        method: 'post',
        url: 'https://www.freelance-informatique.fr/offres-freelance',
        data: qs.stringify({
            competences: encodeURIComponent('Développeur Java'),
            region: 0,
            'new_region': 8,
            'type_recherche_regions': 'new',
            'redirectToLoginPage': 0
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
    const responseBody = await response.data;
    console.log(responseBody);
})();