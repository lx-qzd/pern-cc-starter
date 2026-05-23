import express from "express";
const app = express();
const router = express.Router();
let cars = [
    {
        "id": 1,
        "make": "Toyota",
        "model": "Corolla",
        "year": 2022,
        "color": "Red",
        "price": 22000
    },
    {
        "id": 2,
        "make": "Honda",
        "model": "Civic",
        "year": 2023,
        "color": "Blue",
        "price": 23000
    },
    {
        "id": 3,
        "make": "Ford",
        "model": "Mustang",
        "year": 2024,
        "color": "Black",
        "price": 24000
    }
];
app.use(express.json());
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    req.requestTime = timestamp;
    console.log(`${req.requestTime} - ${req.method} ${req.url}`);
    next();
})
app.get("/", (req, res) => {
    console.log("Request received");
    res.json(cars)
});

router.get('/', (req, res) => {
    res.json(cars)
})
router.post('/', (req, res) => {
    console.log(req.body);
    const { make, model, year, color, price } = req.body
    if (!make || !model || !year || !color || !price) {
        return res.status(400).json({ message: 'Invalid car data' })
    }
    const newCar = {
        id: cars.length + 1,
        make,
        model,
        year: Number(year),
        color,
        price: Number(price)
    }
    cars.push(newCar)
    res.status(201).json(newCar)
})
router.put('/:id', (req, res) => {
    const carId = Number(req.params.id);
    const carIndex = cars.findIndex(car => car.id === carId);
    if (carIndex !== -1) {
        const { make, model, year, color, price } = req.body
        if (!make || !model || !year || !color || !price) {
            return res.status(400).json({ message: 'Invalid car data' })
        }
        const updatedCar = {
            id: carId,
            make: make || cars[carIndex].make,
            model: model || cars[carIndex].model,
            year: Number(year) || cars[carIndex].year,
            color: color || cars[carIndex].color,
            price: Number(price) || cars[carIndex].price
        }
        cars[carIndex] = updatedCar;
        res.json(updatedCar)
    } else {
        res.status(404).json({ message: 'Car not found' })
    }
})
router.delete('/:id', (req, res) => {
    const carId = Number(req.params.id);
    const carIndex = cars.findIndex(car => car.id === carId);
    if (carIndex !== -1) {
        const deletedCar = cars.splice(carIndex, 1)[0];
        res.json(deletedCar)
    } else {
        res.status(404).json({ message: 'Car not found' })
    }
})
router.get('/:id', (req, res) => {
    const carId = Number(req.params.id);
    const car = cars.find(car => car.id === carId);
    if (car) {
        res.json(car)
    } else {
        res.status(404).json({ message: 'Car not found' })
    }

})

app.use('/api/v1/cars', router);
app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/\n");
});