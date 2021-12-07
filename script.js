//obiekty podobne do tych pobieranych z api
const objects = [
    {
        id:1,
        name:"Jablko",
        properties:[
            1,3,4
        ],
        color:"#35ab3f"
    },
	{
        id:2,
        name:"Pomarancza",
        properties:[
            1,3
        ],
        color:"#d9a816"
    },
		{
        id:3,
        name:"Banan",
        properties:[
            2,4,5
        ],
        color:"#b4c421"
    },
	{
        id:4,
        name:"Gruszka",
        properties:[
            1,3,4,5
        ],
        color:"#21a339"
    }
];


const properties = [
    {
        id:1,
        name:"Okragly"
    },
    {
        id:2,
        name:"Kwadratowy"
    },
    {
        id:3,
        name:"Kwasny"
    },
    {
        id:4,
        name:"Słodki"
    },
	{
        id:5,
        name:"Podluzny"
    }
];


//wczytywanie cech obiektow (w tym przypdaku owocow) do wyboru
function bodyOnLoad(){
    const form = document.getElementById("form");
    form.innerHTML=form.innerHTML+properties
		.map(x => `<div><label>${x.name}</label> <input type='checkbox' value='${x.id}'/></div>`)
		.join('');
	update();
}

//obliczanie i wczytywanie danych 
function update(){
    //wczytywanie kolorów, dzielenie ich na trzy liczby 0-255 do pozniejszego porownania
    const selectedColor = document.getElementById("color").value;
    const selectedR = parseInt(selectedColor.slice(1,3),16);
    const selectedG = parseInt(selectedColor.slice(3,5),16);
    const selectedB = parseInt(selectedColor.slice(5,7),16);

    //tablica z zaznaczonymi cechami (ich id)
	const checked = [...document.getElementById('form').elements]
		.map(x => x.checked ? Number(x.value) : null); 
    //mapowanie rankingu obiektów - porownuje cechy z kazdym obiektem z tablicy 
    //objects i liczy roznice kolorow. za kazda ceche przyznaje 0 lub 1 punkt
    //a za kolor 0-5 (potem liczba za kolor jest zaokraglana do wyswietlania)
	const ranking = objects.map(x=>{
        const r = parseInt(x.color.slice(1,3),16);
        const g = parseInt(x.color.slice(3,5),16);
        const b = parseInt(x.color.slice(5,7),16);
        //oblicza roznice miedzy kazda z 3 liczb w kolorze
        const diffrence = (755-(Math.abs(selectedR-r)+Math.abs(selectedG-g)
            +Math.abs(selectedB-b)))/755*5;
		const filtered = x.properties.filter(y => checked.includes(y));
        //zwraca potrzebne wlasciowsci obiektu 
		return {name:x.name, id:x.id, ranking:filtered.length+diffrence };
	});
	
    //sortuje tablice z obiektami po ich punktacji
	ranking.sort((a,b)=>{
	if(a.ranking<b.ranking)
		return true;
	else
		return false;
	});
	
	const display = document.getElementById("display");
    //mapuje nazwe i ranking jako wiersze w html-owej tablicy
    //dla estetyki punkty sa zaokraglane do pelnych liczb
	display.innerHTML=ranking
		.map(x=>`<tr><td>${x.name}</td> <td>${Math.round(x.ranking)}</td></tr>`)
		.join('');
		
}
