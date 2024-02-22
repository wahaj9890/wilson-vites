export const clearLocalStorage = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userPreferredLanguage");
    localStorage.removeItem("consequentialDamage");
    localStorage.removeItem("ReturnReasonsScene_Damage_true_coolingOff_true");
    localStorage.removeItem(
        "ReturnReasonsScene_Damage_true_coolingOff_false"
    );
    localStorage.removeItem(
        "ReturnReasonsScene_Damage_false_coolingOff_true"
    );
    localStorage.removeItem(
        "ReturnReasonsScene_Damage_false_coolingOff_false"
    );
}