'''
class Node:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None
'''

def search(root, key):
    if root is None:
        return 0
    if root.val==key:
        return 1
    return search(root.left, key) or search(root.right, key)
