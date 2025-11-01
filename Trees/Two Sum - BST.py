'''
class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right 
'''    
def findTarget(root, k):

    def inorder(node, nums):
        if not node:
            return
        inorder(node.left, nums)
        nums.append(node.val)
        inorder(node.right, nums)

    nums = []
    inorder(root, nums)

    # Two-pointer technique
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == k:
            return True
        elif current_sum < k:
            left += 1
        else:
            right -= 1

    return False
