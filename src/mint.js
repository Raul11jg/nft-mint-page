
export default function mint(items, formValues){
    const apiurl = `${items}`;
    console.log(formValues);

    return fetch(apiurl)
    .then(response => {
        response.json()
    }
    )
    .then(res=>{
        console.log("OK, Items minted: ", items);
        
    })
    .catch((err) => {
      console.log("Error: " + err);
    })

/*     await mint.methods
            .mint()
            .send({
                from: formValues.creator_wallet_id,
                value: assets[0].royalties
            }); */
}