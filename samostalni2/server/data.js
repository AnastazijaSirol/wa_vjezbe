class Proizvod {
    constructor(id, naziv, cijena, velicine, opis, slike, dostupne_boje, karakteristike) {
        this.id = id;
        this.naziv = naziv;
        this.cijena = cijena;
        this.velicine = velicine;
        this.opis = opis;
        this.slike = slike;
        this.dostupne_boje = dostupne_boje;
        this.karakteristike = karakteristike;
    }
}

const proizvodi = [
    new Proizvod(1, 'Obična crna majica', 100, ['XS', 'S', 'M', 'L'], 'Kratki rukavi', ['https://majstoralata.hr/wp-content/uploads/2019/12/products-TSRA150BK.jpg', 'https://th.bing.com/th/id/OIP.wcqkgLEe2zZDFhQh8JFH9QHaLJ?rs=1&pid=ImgDetMain'], ['crna'], 'karakteristike'),
    new Proizvod(2, "Levi's 501 traperice", 110, ['S', 'M', 'L'], 'Plave boje', ['https://th.bing.com/th/id/OIP.qaETuM9k4Q0FbMVdikKZnAHaFj?rs=1&pid=ImgDetMain', 'https://th.bing.com/th/id/OIP.KRUKkXg9epT-uajcvHrWJwHaKu?rs=1&pid=ImgDetMain'], ['plave'], 'karakteristike'),
    new Proizvod(3, 'Zimska kapa', 40, ['onesize'], 'Grije glavu', ['https://w2.kibuba.com/productpics/12629_1_zimska-kapa-sherpa-gulmi_1600x1280-md.jpg', 'https://img.hattshoppen.se/Jared-Recycled-Beanie-by-Barts.57495a.jpg'], ['šareno'], 'karakteristike'),
    new Proizvod(4, 'Čarape Adidas', 20, ['34-36', '37-39', '40-42'], 'Crne i bijele', ['https://th.bing.com/th/id/R.d96599209a95de7b3461447446c8591d?rik=i%2bd9qJ6quztCxw&pid=ImgRaw&r=0', 'https://th.bing.com/th/id/OIP.6B9uuapbPiuQderRYk97rAHaHa?rs=1&pid=ImgDetMain'], ['crne', 'bijele'], 'karakteristike'),
    new Proizvod(5, 'Tenisice Nike', 200, ['38', '39', '40', '41', '42', '43', '44', '45'], 'Klasika', ['https://img01.ztat.net/article/spp-media-p1/59058eaf056533e687080b174858017e/6e633678a033499ab5db570ecc02bcf0.jpg?imwidth=762', 'https://img01.ztat.net/article/spp-media-p1/b6216c10c1f53cd0be6ae24505dafaa0/5aa2ef6402ba47c19186ab01d4665bc8.jpg?imwidth=762'], ['crne', 'roze'], 'karakteristike')
  ];

  export { Proizvod, proizvodi };