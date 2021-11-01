import json


def get_oil_types():
    print("actions - get_oil_types")

    oil_types = [
        {
            "id": 1,
            "name": "EDGE 5W-40",
            "type": "Full Synthetic",
            "specifications": [
                "API SN/CF",
                "ACEA C3",
                "MB 229.31/ 229.51/ 226.5",
                "VW 505 00/ 505 01",
                "dexos2™*",
                "Ford WSS-M2C917-A",
                "RN0700 / RN0710",
                "FIAT 9.55535-S2",
            ],
        },
        {
            "id": 2,
            "name": "EDGE 10W-60",
            "type": "Full Synthetic",
            "specifications": [
                "API SN/CF",
                "ACEA A3/B3, A3/B4",
                "VW 501 01/ 505 00",
                "Approved for BMW M-Model",
            ],
        },
        {
            "id": 3,
            "name": "MAGNATEC 5W-30 DX",
            "type": "Full Synthetic",
            "specifications": [
                "API SN",
                "ILSAC GF-5",
                "GM dexos1™ Gen 2*",
            ],
        },
    ]

    return json.dumps(oil_types)


def get_user(id="user-id"):
    print("actions - get_user", id)

    user = {
        "id": id,
        "name": "John Smith",
    }

    return json.dumps(user)
