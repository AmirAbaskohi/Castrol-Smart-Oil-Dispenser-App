iot_devices = {
    "cl01": "HostName=znetinnn12ioth01.azure-devices.net;DeviceId=cl01;SharedAccessKey=C3lI2jbo0DVgPtUqMjg7BYxXpBRvGsvXCCP/33zRK34=",  # Cristian's Device
    "js01": "HostName=znetinnn12ioth01.azure-devices.net;DeviceId=js01;SharedAccessKey=9g4Qmbfoi/WZPNTA3HqePqrCjYd1mtj15CKu8hMow9Y=",  # John's Device
    "rd01": "HostName=znetinnn12ioth01.azure-devices.net;DeviceId=rd01;SharedAccessKey=Qeqd/TDF2RflZlRpY2rWbElHKrC3OJ7nMVG3R0LOlF0=",  # Roy's Device
    "sd01": "HostName=znetinnn12ioth01.azure-devices.net;DeviceId=sd01;SharedAccessKey=LDpxKA7Tpnqba3Z3ckEITlRKmLVnNy7/hzB4sMmpR28=",  # Steve's Device / Actual Smart Dispenser
    "mm01": "HostName=znetinnn12ioth01.azure-devices.net;DeviceId=mm01;SharedAccessKey=f0X0nJcyx4ailP0Q8ZYfaHT2YFk2+BkVPkZdf7+l0Yo=",  # Mohsen's Device
    "device001": "HostName=znetinnn12ioth01.azure-devices.net;DeviceId=device_001;SharedAccessKey=s6qT9bdU7vIWdKu1GAaliN5QR4lljBQK4/yIg2cO8QQ=",  # Spare #1
    "device002": "HostName=znetinnn12ioth01.azure-devices.net;DeviceId=device_002;SharedAccessKey=Sn5XrNGsib+NZ9AIxNngQsUGX03rNP41wEKlqdOhcw0=",  # Spare #2
    "device003": "HostName=znetinnn12ioth01.azure-devices.net;DeviceId=device_003;SharedAccessKey=SeB4TvNDT6nVlDU25H5Nvv6/En1gZfQcmJJLsqsfp84=",  # Spare #3
}

print(iot_devices["sd01"])
