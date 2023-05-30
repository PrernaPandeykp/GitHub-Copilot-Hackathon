import requests
import os

def get_weather(city_name):
    key = "OPEN_WEATHER_API_KEY"
    api_key = os.getenv(key)
    
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={api_key}"

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

    print("")
    url= 'https://wttr.in/{}'.format(city)

    result =requests.get(url)

    print(result.text)


if __name__ == "__main__":
    city = input("Enter city name: ")
    get_weather(city)


# city= input("Enter City:")
# print(city)

# print("Displaying Weather Report for city: "+ city)

