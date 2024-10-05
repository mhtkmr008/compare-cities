import axios from 'axios';

const wikiBaseURL="https://en.wikipedia.org/w/api.php";//MediaWiki API that Wikipedia exposes to allow access to its content
const wikidataBaseURL="https://www.wikidata.org/w/api.php";

const getCityInfo=async(cityName)=>{
    try
    {
        const searchResponse = await axios.get(wikiBaseURL,{
            params:{
                action:"query",//informig wiki that its a query
                format:"json",//informig wiki response should be in json
                list:"search",//informing wiki i am searching for information
                srsearch: cityName,//sr: Short for search,,parameter holds the term you are searching for in Wikipedia
                origin: "*",//needed to bypass any CORS restrictions by allowing requests from any origin.
            },
        });
        const pageId=searchResponse.data.query.search[0].pageid;

        const contentResponse=await axios.get(wikiBaseURL,{
            params: {
                action: "query",
                format: "json",
                prop: "pageprops",
                exintro: true,
                pageids: pageId,
                origin: "*", 
            },
        });
        
        const pageData = contentResponse.data.query.pages[pageId];
        const wikidataID=pageData.pageprops.wikibase_item;

        const wikidataResponse= await axios.get(wikidataBaseURL,{
            params: {
                action: "wbgetentities",
                format: "json",
                ids: wikidataID,
                props: "claims",
                origin: "*"
            },
        });

        const wikidataClaims= wikidataResponse.data.entities[wikidataID].claims;

        const countryID= wikidataClaims.P17?wikidataClaims.P17[0].mainsnak.datavalue.value.id:"N/A";
        const stateID =wikidataClaims.P131?wikidataClaims.P131[0].mainsnak.datavalue.value.id:"N/A";
        const population = wikidataClaims.P1082?wikidataClaims.P1082[0].mainsnak.datavalue.value.amount:"N/A";
        const sexRatio=wikidataClaims.P1539?wikidataClaims.P1539.map(claim=>claim.mainsnak.datavalue.value.amount).join(', ')||"N/A":"N/A";
        const languages=wikidataClaims.P37?wikidataClaims.P37.map(lang =>lang.mainsnak.datavalue.value.id):"N/A";
        const area=wikidataClaims.P2046?wikidataClaims.P2046[0].mainsnak.datavalue.value.amount:"N/A";
        const elevation=wikidataClaims.P2044?wikidataClaims.P2044[0].mainsnak.datavalue.value.amount:"N/A";

        const labelResponse= await axios.get(wikidataBaseURL,{
            params:
            {
                action: "wbgetentities",
                format: "json",
                ids: `${countryID}|${stateID}`,
                props: "labels",
                languages: "en",
                origin: "*",
            },
        });

        const countryName= labelResponse.data.entities[countryID]?.labels?.en?.value || "N/A";
        const stateName=labelResponse.data.entities[stateID]?.labels?.en?.value || "N/A";

        return {
            city:
            cityName,
            countryName,
            stateName,
            population,
            sexRatio,
            languages,
            area,
            elevation,
        };
    }
    catch(error){
        console.error("Error fetching city data :",error);
        throw error;
    }
};

export default getCityInfo;