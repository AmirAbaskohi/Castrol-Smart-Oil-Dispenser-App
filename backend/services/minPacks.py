import math


def minPacks(dispensed_quantity, packs=[1, 4, 5, 6, 20]):
    """
    This function determine the minimum number of packs required for a specified quantity.

    Parameters:
    packs (list): pack sizes currently used in workshops.
    dispensed_quantity (float): dispensed quantity.
    pack_info (list): size and number of packs used to for a specified quantity.
    used (float): total volume of packs.
    wastage (float): wasted oil after using the required quantity.
    """
    dq = math.ceil(dispensed_quantity)
    n = len(packs)
    pack_info = []

    i = n - 1
    while i >= 0:
        while dq >= packs[i]:
            dq -= packs[i]
            pack_info.append(packs[i])
        i -= 1

    used = sum(pack_info)
    wastage = round(sum(pack_info)-dispensed_quantity, 2)

    return pack_info, used, wastage
 

#  """uncomment to test"""
# V = 59.3
# packs = [1, 4, 5, 6, 20]
# res, used, wastage = minPacks(V)
# print(f"We need {len(res)} packs.\nThese are the packs:")
# for val in res:
#     print(val)
#
# print(f"Used volume: {sum(res)}")
# print(f"Needed volume: {V}")
# print(f"Unused volume: {sum(res) - V}")
