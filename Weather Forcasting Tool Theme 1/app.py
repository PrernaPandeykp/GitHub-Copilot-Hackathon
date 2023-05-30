import requests

def get_weather(city_name):
    api_key = "6b1f101682a7b16043a11fbdb5dfd229"  # Replace with your OpenWeatherMap API key
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city_name}&appid=6b1f101682a7b16043a11fbdb5dfd229"

    response = requests.get(url)
    data = response.json()

    if response.status_code == 200:  
        weather_description = data["weather"][0]["description"]
        temperature = data["main"]["temp"]
        humidity = data["main"]["humidity"]

        print(f"Weather in {city_name}:")
        print(f"Description: {weather_description}")
        print(f"Temperature: {temperature} K")
        print(f"Humidity: {humidity}%")
    else:
        error_message = data["message"]
        print(f"Error retrieving weather data: {error_message}")


if __name__ == "__main__":
    city = input("Enter city name: ")
    get_weather(city)
